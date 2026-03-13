// =========================================
// EXEMPLE D'IMPLÉMENTATION DU SYSTÈME DE TRADUCTION
// Pour l'interface d'administration BetterLife
// =========================================

/**
 * SYSTÈME DE GESTION MULTILINGUE
 *
 * Stratégie adoptée :
 * 1. Contenu créé en français (langue principale)
 * 2. Notifications automatiques pour traductions
 * 3. Validation par les traducteurs
 * 4. Publication seulement après validation
 */

// =========================================
// 1. COMPOSANT DE CRÉATION/MODIFICATION D'ARTICLE
// =========================================

function BlogPostEditor({ post, onSave }) {
  const [currentLang, setCurrentLang] = useState('fr');
  const [content, setContent] = useState(post || {
    title_fr: '', content_fr: '',
    title_en: '', content_en: '',
    title_es: '', content_es: '',
    title_sw: '', content_sw: '',
    translation_status: 'draft'
  });

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
  ];

  const handleSave = async () => {
    // Déterminer le statut de traduction
    const hasFrench = content.title_fr && content.content_fr;
    const hasEnglish = content.title_en && content.content_en;
    const hasSpanish = content.title_es && content.content_es;
    const hasSwahili = content.title_sw && content.content_sw;

    let translationStatus = 'draft';
    if (hasFrench && hasEnglish && hasSpanish && hasSwahili) {
      translationStatus = 'translated_all';
    } else if (hasFrench) {
      translationStatus = 'translated_fr';
    }

    const updatedContent = {
      ...content,
      translation_status: translationStatus
    };

    await onSave(updatedContent);

    // Si c'était une création/modification en français, créer des notifications
    if (currentLang === 'fr' && translationStatus === 'translated_fr') {
      await createTranslationNotifications(updatedContent.id, 'blog_post');
    }
  };

  return (
    <div className="translation-editor">
      {/* Sélecteur de langue */}
      <div className="lang-tabs">
        {languages.map(lang => (
          <button
            key={lang.code}
            className={currentLang === lang.code ? 'active' : ''}
            onClick={() => setCurrentLang(lang.code)}
          >
            {lang.flag} {lang.name}
            {content[`title_${lang.code}`] && <span className="completed">✓</span>}
          </button>
        ))}
      </div>

      {/* Éditeur de contenu */}
      <div className="editor-content">
        <input
          type="text"
          placeholder={`Titre en ${languages.find(l => l.code === currentLang)?.name}`}
          value={content[`title_${currentLang}`] || ''}
          onChange={(e) => setContent({
            ...content,
            [`title_${currentLang}`]: e.target.value
          })}
        />

        <textarea
          placeholder={`Contenu en ${languages.find(l => l.code === currentLang)?.name}`}
          value={content[`content_${currentLang}`] || ''}
          onChange={(e) => setContent({
            ...content,
            [`content_${currentLang}`]: e.target.value
          })}
        />
      </div>

      {/* Indicateur de statut */}
      <TranslationStatusIndicator status={content.translation_status} />

      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
}

// =========================================
// 2. COMPOSANT DE NOTIFICATIONS DE TRADUCTION
// =========================================

function TranslationNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchPendingNotifications();
  }, []);

  const fetchPendingNotifications = async () => {
    const response = await fetch('/api/admin/translations/pending');
    const data = await response.json();
    setNotifications(data);
  };

  const assignTranslation = async (notificationId, translatorId) => {
    await fetch(`/api/admin/translations/${notificationId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ translator_id: translatorId })
    });
    fetchPendingNotifications();
  };

  return (
    <div className="translation-notifications">
      <h3>🔔 Traductions en attente ({notifications.length})</h3>

      {notifications.map(notification => (
        <div key={notification.id} className="notification-card">
          <div className="priority-badge" data-priority={notification.priority}>
            {notification.priority.toUpperCase()}
          </div>

          <div className="content-info">
            <h4>{notification.message}</h4>
            <p>{notification.content_type} → {notification.target_lang.toUpperCase()}</p>
          </div>

          <div className="actions">
            <select
              onChange={(e) => assignTranslation(notification.id, e.target.value)}
              defaultValue=""
            >
              <option value="">Assigner à...</option>
              {/* Liste des traducteurs */}
              <option value="1">Marie Dupont (FR→EN)</option>
              <option value="2">Carlos Rodriguez (FR→ES)</option>
              <option value="3">Jafari Kimani (FR→SW)</option>
            </select>

            <button
              onClick={() => markAsRead(notification.id)}
              className="btn-secondary"
            >
              Marquer lu
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// =========================================
// 3. COMPOSANT INDICATEUR DE STATUT DE TRADUCTION
// =========================================

function TranslationStatusIndicator({ status }) {
  const statusConfig = {
    draft: { label: 'Brouillon', color: 'gray', icon: '📝' },
    translated_fr: { label: 'Traduction française', color: 'blue', icon: '🇫🇷' },
    translated_all: { label: 'Toutes les langues', color: 'green', icon: '✅' },
    needs_review: { label: 'Révision nécessaire', color: 'orange', icon: '⚠️' }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <div className={`translation-status status-${config.color}`}>
      <span className="icon">{config.icon}</span>
      <span className="label">{config.label}</span>
    </div>
  );
}

// =========================================
// 4. API ENDPOINTS (Backend)
// =========================================

// Créer des notifications de traduction
async function createTranslationNotifications(contentId, contentType) {
  const languages = ['en', 'es', 'sw'];

  for (const lang of languages) {
    await fetch('/api/admin/translations/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content_type: contentType,
        content_id: contentId,
        source_lang: 'fr',
        target_lang: lang,
        message: `Nouveau contenu à traduire en ${lang.toUpperCase()}`,
        priority: lang === 'en' ? 'high' : 'medium'
      })
    });
  }
}

// Récupérer les notifications en attente
app.get('/api/admin/translations/pending', async (req, res) => {
  try {
    const notifications = await db.query(`
      SELECT tn.*, au.username as assigned_translator,
             CASE
               WHEN tn.content_type = 'blog_post' THEN (SELECT title_fr FROM blog_posts WHERE id = tn.content_id)
               ELSE 'Contenu inconnu'
             END as content_title
      FROM translation_notifications tn
      LEFT JOIN admin_users au ON tn.assigned_to = au.id
      WHERE tn.is_read = FALSE
      ORDER BY tn.priority DESC, tn.created_at DESC
    `);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assigner une traduction
app.post('/api/admin/translations/:id/assign', async (req, res) => {
  try {
    const { translator_id } = req.body;
    await db.query(
      'UPDATE translation_notifications SET assigned_to = ?, updated_at = NOW() WHERE id = ?',
      [translator_id, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================================
// 5. WORKFLOW RECOMMANDÉ
// =========================================

/*
WORKFLOW DE TRADUCTION :

1. ADMIN CRÉE CONTENU en Français
   → Trigger détecte changement → Status = 'translated_fr'
   → Notifications créées automatiquement pour EN, ES, SW

2. TRADUCTEURS REÇOIVENT NOTIFICATIONS
   → Interface montre les contenus à traduire
   → Possibilité d'utiliser Google Translate ou DeepL

3. TRADUCTEURS VALIDANT LES TRADUCTIONS
   → Historique sauvegardé dans translation_history
   → Status mis à jour vers 'translated_all'

4. ADMIN VALIDE LA PUBLICATION
   → Contenu visible dans toutes les langues
   → Notifications fermées automatiquement

AVANTAGES :
✅ Cohérence assurée
✅ Traçabilité complète
✅ Pas de contenu manquant
✅ Workflow collaboratif

INCONVÉNIENTS :
❌ Plus complexe à implémenter
❌ Nécessite des traducteurs
❌ Délai de publication plus long
*/

// =========================================
// 6. ALTERNATIVE SIMPLIFIÉE (Auto-traduction)
// =========================================

async function autoTranslate(content, fromLang, toLang) {
  // Utiliser un service de traduction automatique
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: content,
      from: fromLang,
      to: toLang
    })
  });

  const result = await response.json();
  return result.translatedText;
}

// Utilisation dans le composant
async function handleAutoTranslate(lang) {
  const sourceContent = content[`content_fr`];
  const translatedContent = await autoTranslate(sourceContent, 'fr', lang);

  setContent({
    ...content,
    [`content_${lang}`]: translatedContent,
    [`title_${lang}`]: await autoTranslate(content.title_fr, 'fr', lang)
  });
}

export {
  BlogPostEditor,
  TranslationNotifications,
  TranslationStatusIndicator,
  createTranslationNotifications
};