import { en } from "./en.js";

// Swahili : on garde tout le contenu anglais par défaut,
// et on surcharge les sections clés pour l’UI (common/nav/footer).
const swCommon = {
  readMore: "Soma zaidi",
  phase1: "Awamu ya 1",
  phase2: "Awamu ya 2",
  completed: "Iliyokamilika",
  media: "Vyombo vya habari",
  news: "Makala",
  gallery: "Matunzio",
  emplois_stage: "Kazi & Mafunzo",
  donation: "Michango",
  contact: "Mawasiliano",
};

const swFooter = {
  description:
    "Ulinzi wa Mazingira, Bioanuai, na Maendeleo Endelevu katika Jamhuri ya Kidemokrasia ya Kongo.",
  nav_title: "Urambazaji",
  activities_title: "Shughuli",
  contact_title: "Wasiliana nasi",
  rights: "Haki zote zimehifadhiwa.",
  tagline: "Dunia bora",
  location: "Joli Parc, C/Ngaliema",
};

export const sw = {
  ...en,
  common: swCommon,
  footer: swFooter,
  mission: {
    cards: {
      reforestation: {
        title: "Upandaji miti",
        desc: "Kupambana na ongezeko la joto",
      },
      community: { title: "Jamii", desc: "Miradi ya maendeleo ya eneo" },
    },
  },
  donation: {
    hero: {
      title: "Saidia Kazi Zetu",
      subtitle: "Michango yako husaidia kufadhili miradi yetu uwanjani",
    },
    kicker: "Changia",
    title: "Saidia Better Life",
    description:
      "Michango inatafsiriwa kwa upandaji miti, kilimo endelevu na miradi ya jamii.",
    support: {
      title: "Kwa Nini Usaidie",
      text: "Msaada wako unafaidisha jamii moja kwa moja na kulsssinda mazingira.",
    },
    methods: {
      title: "Njia za Kuchangia",
      text: "Uhamisho wa benki, mobile money, au michango mtandaoni kupitia fomu yetu ya mawasiliano.",
    },
    cta: {
      title: "Tayari kuchangia?",
      text: "Wasiliana nasi kupanga uchangishaji wako au omba risiti.",
      btn: "Wasiliana nasi",
    },

    projects: {
      kicker: "Mafanikio Yetu",
      title: "Miradi ya Hivi Karibuni",
      cards: {
        p1: {
          title: "Upandaji Miti Mkubwa Kinshasa",
          location: "Kinshasa, DRC",
          impact: "Miti 500,000 imepandwa",
          status: "Inaendelea",
        },
        p2: {
          title: "Kilimo Endelevu Bas-Congo",
          location: "Kongo Central",
          impact: "Wakulima 1,200 wamefunzwa",
          status: "Imekamilika",
        },
        p3: {
          title: "Ulinzi wa Bioanuai Salonga",
          location: "Hifadhi ya Kitaifa",
          impact: "Jamii 15 zinanufaika",
          status: "Inaendelea",
        },
      },
    },
    testimonials: {
      kicker: "Mashuhuda",
      title: "Wanasema Nini Kuhusu Sisi",
      t1: {
        quote:
          "Shukrani kwa Better Life, mapato yangu yameongezeka mara tatu na ardhi yangu ni rutuba zaidi. Mafunzo ya kilimo endelevu yamebadilisha maisha yangu.",
        author: "Marie Nkulu",
        role: "Mkulima, Kongo Central",
      },
      t2: {
        quote:
          "Mradi huu umebadilisha shule yetu. Wanafunzi sasa ni mabalozi wa mazingira na wanashiriki kikamilifu katika kitalu cha shule.",
        author: "Mwalimu Mkuu",
        role: "Ngaliema, Kinshasa",
      },
    },
    cta: {
      title: "Jiunge na Dhamira Yetu",
      subtitle:
        "Pamoja, tunaweza kuunda mustakabali endelevu kwa DRC na kulinda mazingira yetu",
      btn1: "Changia",
      btn2: "Kuwa Mshirika",
    },
  },
  contact: {
    hero: {
      title: "Wasiliana nasi",
      subtitle: "Usisite kuwasiliana nasi kwa maswali au ushirikiano",
    },
    info: {
      kicker: "Tuwe na Mawasiliano",
      title: "Maelezo Yetu",
      address: {
        title: "Anwani",
        value: "N°5 Av. Des Etangs, Q/ Joli Parc, C/ Ngaliema, Kinshasa - DRC",
      },
      email: { title: "Barua pepe", value: "info@betterlife-ong.org" },
      phone: { title: "Simu", value: "+243 82 9495 919" },
      hours: {
        title: "Muda wa kazi",
        value: "Jumatatu - Ijumaa : 8h00 - 17h00",
      },
    },
    form: {
      title: "Tutumie ujumbe",
      name: "Jina kamili",
      name_placeholder: "Jina lako",
      email: "Barua pepe",
      email_placeholder: "email@example.com",
      subject: "Mada",
      subject_placeholder: "Mada ya ujumbe wako",
      message: "Ujumbe",
      message_placeholder: "Ujumbe wako...",
      btn: "Tuma ujumbe",
    },
    map: {
      title: "Tutafute",
      text: "N°5 Av. Des Etangs, Q/ Joli Parc, C/ Ngaliema, Kinshasa - DRC",
    },
  },
  about: {
    mission: {
      hero: {
        title: "Dhamira Yetu",
        subtitle:
          "Kulinda mazingira na kukuza maendeleo endelevu kwa vizazi vijavyo",
      },
      vision: {
        kicker: "Maono Yetu",
        title: "Mustakabali Endelevu kwa Wote",
        text: "Tunaona dunia ambapo maelewano kati ya binadamu na maumbile yamerudishwa, na kila jamii ina chakula salama na mazingira yaliyohifadhiwa.",
        desc: "Better Life imejitolea kuleta athari chanya na endelevu katika DRC na kwingineko, ikiweka ulinzi wa mazingira na ustawi wa jamii kiini cha hatua zetu.",
      },
      mission: {
        kicker: "Dhamira Yetu",
        title: "Kutenda kwa mabadiliko",
        text: "Tunafanya kazi kila siku kulinda mazingira, kuhifadhi bioanuai, na kukuza usalama wa chakula.",
        desc: "Kupitia programu bunifu na shirikishi, tunamobiliza jamii za wenyeji kuleta mabadiliko chanya na endelevu yanayonufaisha wote.",
      },
      values: {
        kicker: "Maadili Yetu",
        title: "Misingi ya Hatua Zetu",
        items: [
          {
            title: "Uendelevu",
            desc: "Tunapendelea suluhu za muda mrefu zinazo heshimu usawa wa ikolojia.",
          },
          {
            title: "Uwazi",
            desc: "Tunaendesha kwa uadilifu na tunawasiliana wazi juu ya shughuli na matokeo.",
          },
          {
            title: "Ushiriki",
            desc: "Jamii hushirikishwa kikamilifu katika kubuni na kutekeleza miradi.",
          },
          {
            title: "Ubunifu",
            desc: "Tunatafuta njia mpya kuongeza athari za kijamii na kimazingira.",
          },
          {
            title: "Heshima",
            desc: "Tunaiheshimu asili, tamaduni za wenyeji, na utu wa kila mtu.",
          },
          {
            title: "Ubora",
            desc: "Tunatafuta ubora katika kila hatua, kutoka mpango hadi utekelezaji.",
          },
        ],
      },
      impact: {
        kicker: "Maeneo Yetu ya Athari",
        title: "Tunafanya nini",
        items: [
          {
            title: "Ulinzi wa Mazingira",
            desc: "Upandaji miti, uhifadhi wa misitu, kupambana na ukataji ovyo.",
          },
          {
            title: "Usalama wa Chakula",
            desc: "Kilimo endelevu, mafunzo ya mbinu za kisasa, msaada kwa wakulima.",
          },
          {
            title: "Bioanuai",
            desc: "Kulinda spishi zilizo hatarini na kurejesha makazi asilia.",
          },
          {
            title: "Maendeleo ya Jamii",
            desc: "Kuwezesha jamii, kuunda fursa za kiuchumi endelevu.",
          },
        ],
      },
      cta: {
        title: "Jiunge na Dhamira Yetu",
        text: "Pamoja tunaweza kuunda mustakabali wa kijani na endelevu",
        btn_volunteer: "Kuwa Mjumbe",
        btn_contact: "Wasiliana nasi",
      },
    },
  },
  Actions: {
    agricultures: {
      hero: {
        title: "Kilimo Endelevu",
        subtitle: "Kukuza mbinu rafiki kwa mazingira na zenye tija kiuchumi",
      },
      intro: {
        kicker: "Mbinu Yetu",
        title: "Kilimo Binafsi kwa Tabianchi",
        text: "Tunasaidia wakulima katika mabadiliko kwa mbinu endelevu zinazoongeza uzalishaji huku zikilinda mazingira.",
        subtext:
          "Tukikabili changamoto za mabadiliko ya tabianchi, tunakuza kilimo kinachojifaa kwa hali mpya huku kikipunguza athari za ikolojia. Mbinu yetu inajumuisha maarifa ya jadi na ubunifu wa kisasa.",
        objectives: {
          title: "Malengo Yetu",
          items: [
            "Kuongeza uzalishaji wa kilimo kwa 40%",
            "Kufundisha wakulima 5000 mbinu endelevu",
            "Kupunguza matumizi ya dawa za wadudu kwa 60%",
            "Kuboresha usalama wa chakula kwa jamii 50",
          ],
        },
      },
      programs: {
        kicker: "Mipango Yetu",
        title: "Mipango ya Kilimo",
        items: [
          {
            title: "Kilimo cha Misitu",
            desc: "Kuunganisha miti katika mifumo ya kilimo ili kuboresha rutuba ya ardhi na kuongeza mapato.",
            benefits: [
              "Rutuba iliyoongezeka",
              "Mapato yaliyotofautiana",
              "Bioanuai",
            ],
          },
          {
            title: "Kilimo cha Asili",
            desc: "Uzalishaji bila dawa za wadudu au mbolea za kemikali, ukipendelea mbinu za asili.",
            benefits: ["Afya ya umma", "Ardhi hai", "Bidhaa bora"],
          },
          {
            title: "Umwagiliaji Binafsi",
            desc: "Mifumo ya umwagiliaji wa tone-kwa-tone na mbinu za uhifadhi wa maji zinazojifaa kwa hali ya hewa.",
            benefits: ["Kuhifadhi maji", "Mazao thabiti", "Ustahimilivu"],
          },
          {
            title: "Mbegu Bora",
            desc: "Usambazaji wa aina zenye kustahimili ukame na magonjwa, zilizojifaa kwa hali za eneo.",
            benefits: ["Ustahimilivu", "Uzalishaji", "Ujifaa"],
          },
          {
            title: "Kutengeneza Mbolea",
            desc: "Mafunzo ya kutengeneza mbolea bora ili kuongeza rutuba ya ardhi kiasili.",
            benefits: ["Rutuba asilia", "Hakuna taka", "Akiba"],
          },
          {
            title: "Mazao Mchanganyiko",
            desc: "Mbinu za kilimo cha mazao mengi ili kuongeza matumizi ya nafasi na kupunguza wadudu.",
            benefits: ["Uboreshaji", "Ulinzi asilia", "Utofauti"],
          },
        ],
      },
      training: {
        title: "Mafunzo na Msaada",
        items: [
          {
            title: "Warsha za Vitendo",
            desc: "Mafunzo ya uwanjani na maonyesho ya vitendo",
          },
          {
            title: "Msaada Binafsi",
            desc: "Msaada wa kibinafsi kwa wakulima kutoka wataalamu wetu",
          },
          {
            title: "Shule za Wakulima",
            desc: "Sehemu za maonyesho za kujaribu na kujifunza pamoja",
          },
          {
            title: "Nyenzo za Elimu",
            desc: "Miongozo yenye picha na video katika lugha za wenyeji",
          },
        ],
        impact: {
          title: "Athari Inayopimika",
          stats: [
            { number: "3,200+", label: "Wakulima wamefunzwa" },
            { number: "850 ha", label: "Ardhi imebadilishwa" },
            { number: "+45%", label: "Mazao ya wastani" },
            { number: "60%", label: "Kupungua kwa dawa za wadudu" },
          ],
        },
        testimonial: {
          text: '"Shukrani kwa Better Life, nimeongeza uzalishaji wa mahindi mara mbili huku nikipunguza gharama. Mbinu za kilimo cha misitu zimebadilisha ardhi yangu."',
          author: "- Marie Nkulu, Mkulima Kikwit",
        },
      },
      cta: {
        title: "Jiunge na Harakati",
        text: "Ukiwa mkulima, mtaalamu wa kilimo, au mtu mwenye shauku, tunakuhitaji",
        btn_train: "Jisajili kwa Mafunzo",
        btn_more: "Jifunze Zaidi",
      },
    },
    reboisement: {
      hero: {
        title: "Upandaji Miti",
        subtitle:
          "Kurejesha misitu kupambana na mabadiliko ya tabianchi na kulinda bioanuai",
      },
      intro: {
        kicker: "Ahadi Yetu",
        title: "Miti Milioni 1.5 ifikapo 2025",
        text: "Mpango wa upandaji miti unaolenga kurejesha mifumo ya ikolojia iliyoharibika na kuunda vyanzo vya asili vya kaboni.",
        stats: {
          planted: { number: "450,000", label: "Miti tayari imepandwa" },
          survival: { number: "85%", label: "Kiwango cha kuishi" },
        },
      },
      nurseries: {
        kicker: "Vitalu Vyetu",
        title: "Uzalishaji wa Mimea Bora",
        items: [
          {
            name: "Kitalu cha Kinshasa",
            capacity: "Mimea 600,000/mwaka",
            species: "Aina 25",
            details: ["Aina za misitu", "Miti ya matunda", "Aina za wenyeji"],
          },
          {
            name: "Kitalu cha Kikwit",
            capacity: "Mimea 450,000/mwaka",
            species: "Aina 20",
            details: ["Kilimo cha misitu", "Mbao", "Mimea ya dawa"],
          },
          {
            name: "Kitalu cha Mbandaka",
            capacity: "Mimea 500,000/mwaka",
            species: "Aina 22",
            details: ["Msitu wa mvua", "Aina nadra", "Kurejesha"],
          },
        ],
      },
      process: {
        kicker: "Mbinu Yetu",
        title: "Mchakato wa Upandaji Miti",
        items: [
          {
            step: "1",
            title: "Uchunguzi",
            desc: "Uchambuzi wa ardhi na uteuzi wa aina zinazojifaa",
          },
          {
            step: "2",
            title: "Uzalishaji",
            desc: "Kukuza mimea kitaluni kwa miezi 6-12",
          },
          {
            step: "3",
            title: "Kupanda",
            desc: "Kupanda pamoja na jamii za wenyeji",
          },
          {
            step: "4",
            title: "Ufuatiliaji",
            desc: "Matengenezo na ufuatiliaji kwa miaka 3",
          },
        ],
      },
      benefits: {
        env: {
          title: "Faida za Kimazingira",
          items: [
            "Kuhifadhi tani 180,000 za CO2",
            "Kurejesha hekta 2,500 za misitu",
            "Kulinda spishi 150+ za wanyama",
            "Kuboresha ubora wa hewa na maji",
            "Kupambana na mmomonyoko wa ardhi",
          ],
        },
        socio: {
          title: "Faida za Kijamii na Kiuchumi",
          items: [
            "Kuunda ajira 450 za moja kwa moja",
            "Mafunzo kwa wafugaji mimea 1,200",
            "Mapato ya ziada kwa jamii 80",
            "Uzalishaji wa matunda na mbao",
            "Kuimarisha uwezo wa wenyeji",
          ],
        },
      },
      cta: {
        title: "Shiriki Upandaji Miti",
        text: "Panda mti, unda mustakabali. Kila mti ni muhimu katika mapambano yetu dhidi ya mabadiliko ya tabianchi",
        btn_join: "Jiunge na Kampeni",
        btn_sponsor: "Tengeneza Miti",
      },
    },

    communautaires: {
      hero: {
        title: "Maendeleo ya Jamii",
        subtitle: "Kuwezesha jamii kwa maendeleo jumuishi na endelevu",
      },
      intro: {
        kicker: "Mbinu Yetu",
        title: "Kiini cha Jamii",
        text: "Tunafanya kazi pamoja na jamii za wenyeji kuunda fursa za kiuchumi endelevu na kuboresha hali ya maisha.",
      },
      programs: {
        kicker: "Mipango Yetu",
        title: "Mipango ya Jamii",
        items: [
          {
            title: "Vikundi vya Akiba",
            desc: "Kuunda tontini na vikundi vya akiba kwa uhuru wa kifedha wa familia.",
            impact: "Vikundi 85 vimeundwa, wanachama 2,400",
          },
          {
            title: "Kujifunza Kusoma na Kuandika",
            desc: "Mipango ya kujifunza kusoma na kuandika kwa watu wazima, hasa wanawake.",
            impact: "Watu 1,200 wamefunzwa",
          },
          {
            title: "Kupata Maji",
            desc: "Ujenzi wa visima na mifumo ya maji salama katika vijiji vilivyojitenga.",
            impact: "Visima 35 vimejengwa",
          },
          {
            title: "Mabustani ya Shule",
            desc: "Kuunda mabustani katika shule kwa lishe na elimu ya mazingira.",
            impact: "Shule 45 zimejengewa",
          },
          {
            title: "Ufundi wa Wenyeji",
            desc: "Mafunzo na msaada kwa wafundi wa wenyeji kuongeza ujuzi wa jadi.",
            impact: "Wafundi 300 wamesaidika",
          },
          {
            title: "Afya ya Jamii",
            desc: "Uhamasishaji wa usafi na mafunzo ya watu wa afya wa jamii.",
            impact: "Watu 120 wa afya wamefunzwa",
          },
        ],
      },
      women: {
        title: "Kuwezesha Wanawake",
        text: "Wanawake ni kiini cha mipango yetu ya maendeleo ya jamii. Tunawasaidia kuwa watendaji wa mabadiliko katika jamii zao.",
        items: [
          "Mafunzo ya ujasiriamali",
          "Kupata mkopo mdogo",
          "Uongozi wa jamii",
          "Mbinu za kisasa za kilimo",
        ],
        stats: [
          { number: "65%", label: "Wanawake walengwa" },
          { number: "1,500", label: "Wanawake wamefunzwa" },
          { number: "45", label: "Vyama vya wanawake" },
          { number: "+80%", label: "Mapato yameongezeka" },
        ],
        testimonial: {
          text: '"Shukrani kwa Better Life, nimeunda chama changu cha kusindika mihogo. Leo ninafundisha wanawake wengine na ninalisha familia yangu."',
          author: "- Thérèse Mbuyi, Rais Chama Tumaini",
        },
      },
      stories: {
        kicker: "Mafanikio",
        title: "Hadithi Zenye Kusisimua",
        items: [
          {
            title: "Kijiji cha Kikongo",
            achievement: "Kupata maji salama",
            desc: "Ujenzi wa visima 3 na mafunzo ya kamati ya usimamizi. Kupungua kwa 75% kwa magonjwa ya maji.",
            impact: "Watu 1,200 wanafaidika",
          },
          {
            title: "Jamii ya Mbanza",
            achievement: "Kujitegemea chakula",
            desc: "Kuunda mabustani ya jamii na mafunzo ya bustani. Uzalishaji wa tani 5 za mboga/mwezi.",
            impact: "Familia 350 zinalishwa",
          },
        ],
      },
      cta: {
        title: "Tegemea Jamii Zetu",
        text: "Msaada wako unaweza kubadilisha maisha ya maelfu ya watu",
        btn_volunteer: "Kuwa Mjumbe",
        btn_donate: "Changia",
      },
    },
    elevages: {
      hero: {
        title: "Ufugaji Endelevu",
        subtitle:
          "Kukuza mbinu za ufugaji zinazoheshimu mazingira na afya ya mifugo",
      },
      intro: {
        kicker: "Mbinu Yetu",
        title: "Ufugaji wa Kisasa na Endelevu",
        text: "Tunasaidia wafugaji katika kupitisha mbinu za kisasa zinazoboresha uzalishaji huku zikiheshimu ustawi wa wanyama na mazingira.",
      },
      types: {
        kicker: "Sekta Zetu",
        title: "Aina za Ufugaji",
        items: [
          {
            title: "Ufugaji wa Kuku",
            desc: "Ufugaji wa kuku wa nyama na wa mayai na mbinu za kisasa za chakula na usimamizi.",
            prod: "Kuku 15,000/mwezi",
          },
          {
            title: "Wanyama Wadogo",
            desc: "Ufugaji wa mbuzi na kondoo waliokubaliana na hali ya hewa, wenye kustahimili magonjwa.",
            prod: "Vichwa 2,500",
          },
          {
            title: "Nguruwe",
            desc: "Ufugaji wa nguruwe ukiangazia usafi na lishe bora.",
            prod: "Nguruwe 1,200/mwaka",
          },
          {
            title: "Ng'ombe",
            desc: "Ufugaji wa maziwa na nyama na uboreshaji wa jenetiki na huduma za mifugo.",
            prod: "Vichwa 800",
          },
          {
            title: "Ufugaji Nyuki",
            desc: "Uzalishaji wa asali na bidhaa za mzinga na mizinga ya kisasa.",
            prod: "Tani 5 asali/mwaka",
          },
          {
            title: "Ufugaji Samaki",
            desc: "Ufugaji wa samaki kwenye mabwawa na chakula cha asili na usimamizi endelevu.",
            prod: "Tani 12/mwaka",
          },
        ],
      },
      Actions: {
        kicker: "Vitendo Vyetu",
        title: "Msaada Kamili",
        items: [
          {
            title: "Afya ya Wanyama",
            items: [
              "Chanjo na kuondoa minyoo",
              "Mashauriano ya mifugo",
              "Duka la dawa za mifugo",
              "Ufuatiliaji wa mara kwa mara wa afya",
            ],
          },
          {
            title: "Uboreshaji wa Jenetiki",
            items: [
              "Uchaguzi wa wazazi",
              "Kutia mimba kwa njia ya kisasa",
              "Mchanganyiko wa uboreshaji",
              "Ufuatiliaji wa utendaji",
            ],
          },
          {
            title: "Chakula",
            items: [
              "Kutengeneza chakula",
              "Uzalishaji wa chakula",
              "Mazao ya malisho",
              "Viongezi vya lishe",
            ],
          },
          {
            title: "Miundombinu",
            items: [
              "Kubuni majengo",
              "Vifaa vya kisasa",
              "Mifumo ya maji",
              "Usimamizi wa taka",
            ],
          },
        ],
      },
      success: {
        label: "Hadithi ya Mafanikio",
        title: "Kutoka Kuku 5 hadi 200 katika Mwaka 2",
        text: "Jean Kalala alianza na banda dogo la kuku 5 wa mayai. Shukrani kwa msaada wetu wa kiufundi na kifedha, sasa anaendesha shamba la kisasa la kuku 200 wa mayai na kuku 500 wa nyama.",
        items: [
          "Mafunzo ya ufugaji wa kisasa wa kuku",
          "Kupata mkopo mdogo",
          "Ufuatiliaji wa mara kwa mara wa mifugo",
          "Masoko yaliyohakikishwa",
        ],
        stats: [
          { label: "Kabla", value: "$50/mwezi" },
          { label: "Baada", value: "$800/mwezi" },
          { label: "Ajira zilizoundwa", value: "4" },
          { label: "Kiwango cha kufa", value: "-75%" },
        ],
      },
      impact: {
        title: "Athari Yetu",
        stats: [
          { number: "2,500+", label: "Wafugaji wamefunzwa" },
          { number: "45,000", label: "Wanyama wanafuatiliwa" },
          { number: "+120%", label: "Uzalishaji wa maziwa" },
          { number: "85%", label: "Kiwango cha kuishi" },
        ],
      },
      cta: {
        title: "Anza Ufugaji Wako",
        text: "Faidika na ujuzi wetu kuunda au kukuza shughuli yako ya ufugaji",
        btn_offers: "Angalia Ofa Zetu",
        btn_contact: "Wasiliana Nasi",
      },
    },
  },

  Actions: {
    index: {
      hero: {
        tag: "Vitendo Vyetu",
        title: "Gundua Vitendo Vyetu",
        subtitle:
          "Muhtasari wa haraka: kilimo, upandaji miti, bioanuwai, miradi ya jamii na ufugaji. Bonyeza kujifunza zaidi.",
      },
      kicker: "Vitendo Vyetu",
      title: "Maeneo ya Athari",
      cards: {
        agriculture: {
          desc: "Mafunzo na msaada wa kiufundi kuboresha uzalishaji wa kilimo.",
        },
        reboisement: {
          desc: "Viwanda vya mimea, upandaji miti na urejeshaji wa mandhari.",
        },
        biodiversite: { desc: "Ulinzi wa ekosistimu na uhifadhi wa spishi." },
        communautaire: {
          desc: "Miradi ya jamii inayolenga afya, elimu na vyanzo vya kujikimu.",
        },
        elevage: {
          desc: "Maendeleo ya ufugaji endelevu na afya bora ya wanyama.",
        },
        equipements: {
          title: "Vifaa na Mafunzo",
          desc: "Msaada wa kiufundi na vifaa kuendeleza wazalishaji wa ndani.",
        },
      },
      approach: { kicker: "Njia Iliyounganishwa" },
      objectives: { kicker: "Malengo Makuu" },
      cta: {
        title: "Tayari kushirikiana?",
        text: "Wasiliana nasi kwa tathmini ya bure au nukuu ya kibinafsi.",
        btn: "Wasiliana Nasi",
      },
    },
  },
  blog: {
    index: {
      hero: {
        kicker: "Habari / Blog",
        title: "Makala na matangazo",
      },
      items: {
        excerpt:
          "Ongeza hapa dondoo, vyombo vya habari (picha/video) na kiungo cha makala kamili.",
        readMore: "Soma makala",
      },
      sections: {
        interviews: {
          title: "Mahojiano na video",
          desc: "Weka hapa rasilimali za vyombo vya habari: mashuhuda ya wakulima, washirika, nyuma ya pazia.",
        },
        campaigns: {
          title: "Kampeni zinazoendelea",
          desc: "Matangazo ya matukio, ukusanyaji wa fedha, siku za upandaji miti, mafunzo wazi.",
        },
      },
    },
    news: {
      hero: {
        title: "Habari",
        subtitle: "Kukaa na habari za hatua na mafanikio yetu ya hivi karibuni",
      },
      intro: {
        kicker: "Habari za Hivi Karibuni",
        title: "Sikiliza Matukio Yetu",
        text: "Fuata matukio yetu, mafanikio, na mipango mpya kwa maendeleo endelevu katika DRC.",
      },
      categories: {
        title: "Kategoria",
        all: "Zote",
        announcement: "Tangazo",
        partnership: "Ushirikiano",
        training: "Mafunzo",
        success: "Mafanikio",
        infrastructure: "Miundombinu",
        recognition: "Utambuzi",
        projects: "Miradi",
        events: "Matukio",
        partnerships: "Ushirikiano",
        trainings: "Mafunzo",
      },
      filters: {
        title: "Chuja",
        date: "Tarehe",
        category: "Kategoria",
        search: "Tafuta habari...",
      },
      featured: {
        label: "Maalum",
      },
      readMore: "Soma zaidi →",
      empty: {
        title: "Hakuna Habari",
        text: "Hakuna makala yaliyopatikana kwa sasa. Rudi baadaye kwa habari mpya.",
      },
      newsletter: {
        title: "Kukaa na Habari",
        text: "Jisajili kwa jarida yetu kupokea habari zetu moja kwa moja kwenye sanduku lako la barua",
        placeholder: "Anwani yako ya barua pepe",
        subscribe: "Jisajili",
      },
      articles: {
        reforestation2025: {
          title: "Uzinduzi wa Mpango wa Upandaji Miti 2025",
          excerpt:
            "Better Life inatangaza uzinduzi wa mpango wake wa kupanda miti milioni 1 kwa mwaka 2025.",
        },
        unepPartnership: {
          title: "Ushirikiano wa Kimkakati na UNEP",
          excerpt:
            "Kusaini makubaliano ya ushirikiano na Mpango wa Umoja wa Mataifa wa Mazingira kuimarisha vitendo vyetu.",
        },
        farmersTraining: {
          title: "Mafunzo ya Wakulima 500 Kikwit",
          excerpt:
            "Mafanikio ya mpango wetu wa mafunzo ya kilimo binafsi kwa tabianchi na wakulima 500 wamefunzwa.",
        },
        bioCertification: {
          title: "Udhibitisho wa Bio kwa Wazalishaji 150",
          excerpt:
            "Wazalishaji 150 wanaosaidiwa na Better Life wanapata udhibitisho wao wa kilimo cha asili.",
        },
        nurseryMbandaka: {
          title: "Kitalu Kipya Mbandaka",
          excerpt:
            "Uzinduzi wa kitalu chetu kipya kinachoweza kuzalisha mimea 600,000 kwa mwaka.",
        },
        excellenceAward: {
          title: "Tuzo ya Ubora wa Mazingira 2024",
          excerpt:
            "Better Life inapokea Tuzo ya Ubora wa Mazingira iliyotolewa na Wizara ya Mazingira.",
        },
      },
    },
    gallery: {
      hero: {
        title: "Matunzio ya Picha",
        subtitle: "Gundua vitendo vyetu uwanjani na mafanikio katika picha",
      },
      intro: {
        kicker: "Picha Zetu",
        title: "Gundua Kazi Yetu",
        text: "Picha na video za miradi yetu, matukio, na mafanikio katika maeneo mbalimbali ya DRC.",
      },
      stats: {
        photos: "Picha",
        videos: "Video",
        albums: "Albamu",
        years: "Miaka ya kumbukumbu",
      },
      categories: {
        title: "Kategoria",
        all: "Zote",
        projects: "Miradi",
        events: "Matukio",
        communities: "Jamii",
        nature: "Asili",
      },
      filters: {
        title: "Chuja",
        date: "Tarehe",
        category: "Kategoria",
        location: "Eneo",
      },
      collections: {
        kicker: "Mkusanyiko",
        title: "Albamu za Mada",
        viewAlbum: "Angalia albamu",
        photos: "picha",
        reforestation: {
          title: "Upandaji Miti 2024",
          desc: "Picha za kampeni zetu za kupanda miti nchini kote",
        },
        farmersTraining: {
          title: "Mafunzo ya Wakulima",
          desc: "Wakati mkuu wa mafunzo yetu ya kilimo endelevu",
        },
        biodiversity: {
          title: "Bioanuai",
          desc: "Wanyama na mimea iliyolindwa na mipango yetu ya uhifadhi",
        },
        communities: {
          title: "Jamii",
          desc: "Mikutano na jamii zinazofaidika na miradi yetu",
        },
        nurseries: {
          title: "Vitalu",
          desc: "Vitalu vyetu vya shule na uzalishaji wa mimea",
        },
        events: {
          title: "Matukio",
          desc: "Sherehe, uzinduzi na sherehe za mafanikio yetu",
        },
      },
      recent: {
        kicker: "Hivi Karibuni",
        title: "Picha za Hivi Karibuni Zilizoongezwa",
        items: {
          plantationKinshasa: "Upandaji Kinshasa",
          trainingKikwit: "Mafunzo Kikwit",
          modernHives: "Mizinga ya Kisasa",
          villageWell: "Kisima cha Kijiji",
          certificates: "Utolewaji wa Vyeti",
          bioHarvest: "Mavuno ya Bio",
          butterfliesSalonga: "Vipepeo Salonga",
          schoolGarden: "Bustani ya Shule",
          unepPartnership: "Ushirikiano UNEP",
          excellenceAward: "Tuzo ya Ubora",
          nurseryMbandaka: "Kitalu Mbandaka",
          communityAssembly: "Mkutano wa Jamii",
        },
      },
      videos: {
        kicker: "Video",
        title: "Makala Yetu",
        watch: "▶ Angalia",
        duration: "Muda",
        views: "Maoni",
        items: {
          reforestationYear: "Upandaji Miti: Mwaka Mmoja wa Kupanda",
          farmersPortrait: "Picha ya Wakulima Walibadilishwa",
          congoBiodiversity: "Bioanuai ya Bonde la Kongo",
        },
      },
      empty: {
        title: "Hakuna Picha",
        text: "Hakuna picha zilizopatikana kwa sasa. Rudi baadaye kwa maudhui mpya.",
      },
      view: {
        title: "Angalia Picha",
        close: "Funga",
        prev: "Iliyopita",
        next: "Inayofuata",
        info: "Maelezo",
      },
      cta: {
        title: "Shiriki Picha Zako",
        text: "Umeshiriki katika moja ya matukio yetu? Shiriki picha zako nasi!",
        btn: "Tuma Picha",
      },
    },
  },

};
