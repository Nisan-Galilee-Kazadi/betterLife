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

const swNav = {
  home: "Mwanzo",
  about: "Kuhusu Sisi",
  mission: "Dhamira Yetu",
  team: "Timu Yetu",
  partners: "Washirika Wetu",
  Actions: "Vitendo Vyetu",
  agriculture: "Kilimo",
  cacao: "Kakao (Criollo)",
  cafe: "Kahawa ya Arabica",
  the: "Chai",
  coton_caoutchouc: "Pamba na Mpira",
  arboriculture: "Ukuzaji wa Miti ya Matunda",
  plantes_medicinales: "Mimea ya Dawa",
  Environement: "Mazingira na Hali ya Hewa",
  biodiversity: "Bioanuwai",
  community: "Mradi wa Jamii",
  breeding: "Ufugaji",
  elevage_gros_betail: "Ufugaji wa Ng'ombe",
  pisciculture: "Ufugaji wa Samaki",
  elevage_chiens: "Ufugaji wa Mbwa",
  elevage_serpents: "Ufugaji wa Nyoka",
  apiculture: "Ufugaji wa Nyuki",
  projet_communautaire: "Mradi wa Jamii",
  sante: "Afya",
  energie: "Nishati",
  education: "Elimu",
  route_desserte_agricole: "Barabara za Vijijini",
  habitation: "Makazi",
  mecanisation: "Matumizi ya Mitambo ya Kilimo",
  tracteur: "Trekta",
  accessoires: "Vifaa",
  autres: "Vifaa Vingine",
  environement: "Mazingira",
  protection_foret: "Ulinzi wa Misitu",
  reboisement: "Upandaji Miti",
  credit_carbone: "Mkopo wa Carbon",
  eco_kelasi: "Eco Kelasi",
  climate: "Mabadiliko ya Tabianchi",
  projects: "Miradi",
  ongoing: "Inaendelea",
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
  nav: swNav,
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
      text: "Msaada wako unafaidisha jamii moja kwa moja na kulinda mazingira.",
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
      email: { title: "Barua pepe", value: "infos@betterlife-ong.org" },
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
        subtitle: "Kulinda mazingira na kukuza maendeleo endelevu kwa vizazi vijavyo",
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
          { title: "Uendelevu", desc: "Tunapendelea suluhu za muda mrefu zinazo heshimu usawa wa ikolojia." },
          { title: "Uwazi", desc: "Tunaendesha kwa uadilifu na tunawasiliana wazi juu ya shughuli na matokeo." },
          { title: "Ushiriki", desc: "Jamii hushirikishwa kikamilifu katika kubuni na kutekeleza miradi." },
          { title: "Ubunifu", desc: "Tunatafuta njia mpya kuongeza athari za kijamii na kimazingira." },
          { title: "Heshima", desc: "Tunaiheshimu asili, tamaduni za wenyeji, na utu wa kila mtu." },
          { title: "Ubora", desc: "Tunatafuta ubora katika kila hatua, kutoka mpango hadi utekelezaji." },
        ],
      },
      impact: {
        kicker: "Maeneo Yetu ya Athari",
        title: "Tunafanya nini",
        items: [
          { title: "Ulinzi wa Mazingira", desc: "Upandaji miti, uhifadhi wa misitu, kupambana na ukataji ovyo." },
          { title: "Usalama wa Chakula", desc: "Kilimo endelevu, mafunzo ya mbinu za kisasa, msaada kwa wakulima." },
          { title: "Bioanuai", desc: "Kulinda spishi zilizo hatarini na kurejesha makazi asilia." },
          { title: "Maendeleo ya Jamii", desc: "Kuwezesha jamii, kuunda fursa za kiuchumi endelevu." },
        ],
      },
    },
  },
  Actions: {
    index: {
      hero: {
        tag: "Vitendo Vyetu",
        title: "Gundua Vitendo Vyetu",
        subtitle: "Muhtasari wa haraka: kilimo, upandaji miti, bioanuwai, miradi ya jamii na ufugaji.",
      },
    },
  },
  home: {
    hero: {
      title: "Chagua Mazingira Safi,\nChakula Safi",
      subtitle:
        "Dhamira yetu ni kulinda mazingira, bioanuwai, kupigania uhifadhi wa asili, ustawi wa idadi ya watu na kukuza usalama wa chakula.",
      cta1: "Gundua vitendo vyetu",
      cta2: "Wasiliana nasi",
      slides: [
        {
          title: "Ulinzi wa Mazingira na Bioanuwai",
          description: "Kupambana na ukataji miti na kuhifadhi mifumo ya asili ya DRC kwa mustakabali endelevu."
        },
        {
          title: "Usalama wa Chakula",
          description: "Kuboresha uzalishaji wa kilimo na minyororo ya thamani ili kulisha watu wetu kwa njia endelevu."
        },
        {
          title: "Matumizi ya Mitambo katika Kilimo",
          description: "Uboreshaji wa mbinu na kutoa vifaa vinavyofaa kwa ajili ya kilimo cha ufanisi mkubwa."
        },
        {
          title: "Miradi ya Kijamii",
          description: "Huduma za msingi na shughuli za kutoa kipato kwa ajili ya maendeleo ya vijiji vyetu."
        },
        {
          title: "Ufugaji wa Kiwango Kikubwa",
          description: "Mifumo ya kisasa na afya ya wanyama katika moyo wa utaalamu wetu."
        },
        {
          title: "Kilimo",
          description: "Kukuza kilimo endelevu kwa kuzingatia kakao ya Criollo, kahawa na chai."
        }
      ]
    },
    stats: {
      title: "Athari Yetu kwa Idadi",
      subtitle: "Matokeo madhubuti yanayobadilisha maisha",
    },
    mission: {
      kicker: "Dhamira Yetu",
      title: "Kuchukua Hatua kwa Ajili ya Hali ya Hewa na Bioanuwai",
      desc1:
        "Better Life husaidia watu kuelewa kwa urahisi kwa nini tabia fulani za kibinadamu zina athari mbaya kwa bioanuwai na kupendekeza njia madhubuti za kuchukua hatua.",
      desc2:
        "Tumeunda vitalu vya shule vya miti milioni moja laki tano ya spishi za misitu na matunda ili kupambana na ongezeko la joto duniani.",
      stat1_val: "3M+",
      stat1_label: "Miti iliyopandwa",
      stat2_val: "2021",
      stat2_label: "Mwaka wa kuanzishwa",
      cards: {
        biodiversity: {
          title: "Bioanuwai",
          desc: "Kulinda mifumo dhaifu ya mazingira",
        },
        agriculture: {
          title: "Kilimo",
          desc: "Mbinu bora za hali ya hewa",
        },
        reforestation: {
          title: "Upandaji miti",
          desc: "Kupambana na ongezeko la joto",
        },
        community: {
          title: "Jamii",
          desc: "Miradi ya maendeleo ya ndani",
        },
      },
    },
    projects: {
      kicker: "Mafanikio Yetu",
      title: "Miradi ya Hivi Karibuni",
      cards: {
        p1: {
          title: "Upandaji Miti Mkubwa Kinshasa",
          location: "Kinshasa, DRC",
          impact: "Miti 500,000 iliyopandwa",
          status: "Inaendelea",
        },
        p2: {
          title: "Kilimo Endelevu Bas-Congo",
          location: "Kongo Central",
          impact: "Wakulima 1,200 waliofunzwa",
          status: "Imekamilika",
        },
        p3: {
          title: "Ulinzi wa Bioanuwai Salonga",
          location: "Hifadhi ya Taifa",
          impact: "Jamii 15 wanufaika",
          status: "Inaendelea",
        },
      },
    },
    testimonials: {
      kicker: "Ushuhuda",
      title: "Wanayosema kutuhusu",
      t1: {
        quote:
          "Shukrani kwa Better Life, kipato changu kimeongezeka mara tatu na ardhi yangu ina rutuba zaidi kuliko hapo awali. Mafunzo ya kilimo endelevu yamebadilisha maisha yangu kweli.",
        author: "Marie Nkulu",
        role: "Mkulima, Kongo Central",
      },
      t2: {
        quote:
          "Mradi huu ulibadilisha shule yetu. Wanafunzi sasa ni mabalozi wa mazingira na wanashiriki kikamilifu katika kitalu cha shule.",
        author: "Mkurugenzi wa Shule ya Msingi",
        role: "Ngaliema, Kinshasa",
      },
    },
    cta: {
      title: "Jiunge na Dhamira Yetu",
      subtitle:
        "Pamoja, tunaweza kuunda mustakabali endelevu wa DRC na kulinda mazingira yetu",
      btn1: "Toa Mshango",
      btn2: "Kuwa Mshirika",
    },
  }
};
