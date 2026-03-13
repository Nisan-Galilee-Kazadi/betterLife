/**
 * SERVICE DE TRADUCTION AUTOMATIQUE
 *
 * Utilise Google Translate API pour traduire automatiquement
 * le contenu depuis le français vers EN, ES, SW
 */

const axios = require('axios');

// Configuration des services de traduction
const TRANSLATION_CONFIG = {
  google: {
    url: 'https://translation.googleapis.com/language/translate/v2',
    key: process.env.GOOGLE_TRANSLATE_API_KEY,
    maxLength: 5000
  },
  deepl: {
    url: 'https://api-free.deepl.com/v2/translate',
    key: process.env.DEEPL_API_KEY,
    maxLength: 130000
  }
};

// Langues cibles pour BetterLife
const TARGET_LANGUAGES = ['en', 'es', 'sw'];
const SOURCE_LANGUAGE = 'fr';

class AutoTranslationService {
  constructor() {
    this.primaryService = 'google'; // Service principal
    this.fallbackService = 'deepl'; // Service de secours
  }

  /**
   * Traduit un texte vers plusieurs langues
   */
  async translateToAllLanguages(text, sourceLang = SOURCE_LANGUAGE) {
    const results = {};

    for (const targetLang of TARGET_LANGUAGES) {
      try {
        results[targetLang] = await this.translateText(text, sourceLang, targetLang);
        console.log(`✅ Traduction ${sourceLang}→${targetLang}: ${text.substring(0, 50)}...`);
      } catch (error) {
        console.error(`❌ Erreur traduction ${sourceLang}→${targetLang}:`, error.message);
        results[targetLang] = null;
      }
    }

    return results;
  }

  /**
   * Traduit un texte d'une langue à une autre
   */
  async translateText(text, from, to) {
    if (!text || text.trim().length === 0) {
      return '';
    }

    // Vérifier le cache d'abord
    const cached = await this.getCachedTranslation(text, from, to);
    if (cached) {
      console.log(`📋 Cache hit pour ${from}→${to}`);
      return cached;
    }

    // Traduction avec le service primaire
    try {
      const translated = await this.translateWithService(text, from, to, this.primaryService);
      await this.cacheTranslation(text, from, to, translated, this.primaryService);
      return translated;
    } catch (primaryError) {
      console.warn(`⚠️ Service primaire (${this.primaryService}) échoué, tentative avec fallback`);

      // Essayer avec le service de fallback
      try {
        const translated = await this.translateWithService(text, from, to, this.fallbackService);
        await this.cacheTranslation(text, from, to, translated, this.fallbackService);
        return translated;
      } catch (fallbackError) {
        console.error(`❌ Les deux services de traduction ont échoué`);
        throw new Error(`Traduction impossible: ${primaryError.message}`);
      }
    }
  }

  /**
   * Traduction avec un service spécifique
   */
  async translateWithService(text, from, to, service) {
    const config = TRANSLATION_CONFIG[service];

    if (!config.key) {
      throw new Error(`Clé API manquante pour ${service}`);
    }

    switch (service) {
      case 'google':
        return await this.translateWithGoogle(text, from, to, config);
      case 'deepl':
        return await this.translateWithDeepL(text, from, to, config);
      default:
        throw new Error(`Service de traduction inconnu: ${service}`);
    }
  }

  /**
   * Traduction avec Google Translate
   */
  async translateWithGoogle(text, from, to, config) {
    // Diviser le texte si trop long
    const chunks = this.splitText(text, config.maxLength);

    const translations = [];
    for (const chunk of chunks) {
      const response = await axios.post(`${config.url}?key=${config.key}`, {
        q: chunk,
        source: from,
        target: to,
        format: 'text'
      });

      if (response.data?.data?.translations?.[0]?.translatedText) {
        translations.push(response.data.data.translations[0].translatedText);
      } else {
        throw new Error('Réponse Google Translate invalide');
      }
    }

    return translations.join(' ');
  }

  /**
   * Traduction avec DeepL
   */
  async translateWithDeepL(text, from, to, config) {
    // DeepL utilise des codes de langue différents
    const deeplFrom = this.convertToDeepLLang(from);
    const deeplTo = this.convertToDeepLLang(to);

    const response = await axios.post(config.url, null, {
      params: {
        auth_key: config.key,
        text: text,
        source_lang: deeplFrom,
        target_lang: deeplTo
      }
    });

    if (response.data?.translations?.[0]?.text) {
      return response.data.translations[0].text;
    } else {
      throw new Error('Réponse DeepL invalide');
    }
  }

  /**
   * Convertit les codes de langue en codes DeepL
   */
  convertToDeepLLang(lang) {
    const mapping = {
      'en': 'EN',
      'fr': 'FR',
      'es': 'ES',
      'sw': 'SW' // Kiswahili n'est pas supporté par DeepL, utiliser EN comme fallback
    };
    return mapping[lang] || 'EN';
  }

  /**
   * Divise le texte en chunks pour respecter les limites API
   */
  splitText(text, maxLength) {
    if (text.length <= maxLength) {
      return [text];
    }

    const chunks = [];
    let remaining = text;

    while (remaining.length > 0) {
      if (remaining.length <= maxLength) {
        chunks.push(remaining);
        break;
      }

      // Trouver un bon point de division (fin de phrase)
      let splitPoint = maxLength;
      const sentenceEndings = ['. ', '! ', '? ', '\n'];

      for (const ending of sentenceEndings) {
        const lastEnding = remaining.lastIndexOf(ending, maxLength);
        if (lastEnding > maxLength * 0.7) { // Au moins 70% de la longueur max
          splitPoint = lastEnding + ending.length;
          break;
        }
      }

      chunks.push(remaining.substring(0, splitPoint));
      remaining = remaining.substring(splitPoint);
    }

    return chunks;
  }

  /**
   * Gestion du cache des traductions
   */
  async getCachedTranslation(text, from, to) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(text).digest('hex');

    const [rows] = await global.db.execute(
      'SELECT translated_text FROM translation_cache WHERE content_hash = ? AND source_lang = ? AND target_lang = ? AND is_valid = TRUE',
      [hash, from, to]
    );

    return rows.length > 0 ? rows[0].translated_text : null;
  }

  async cacheTranslation(sourceText, from, to, translatedText, service) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(sourceText).digest('hex');

    await global.db.execute(
      `INSERT INTO translation_cache
       (content_hash, source_lang, target_lang, source_text, translated_text, translation_service)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       translated_text = VALUES(translated_text),
       translation_service = VALUES(translation_service),
       last_used = CURRENT_TIMESTAMP`,
      [hash, from, to, sourceText, translatedText, service]
    );
  }

  /**
   * Nettoie le cache des anciennes traductions
   */
  async cleanupCache(daysOld = 30) {
    const [result] = await global.db.execute(
      'DELETE FROM translation_cache WHERE last_used < DATE_SUB(NOW(), INTERVAL ? DAY)',
      [daysOld]
    );

    console.log(`🧹 Cache nettoyé: ${result.affectedRows} entrées supprimées`);
    return result.affectedRows;
  }
}

// Instance globale du service
const translationService = new AutoTranslationService();

module.exports = {
  AutoTranslationService,
  translationService
};