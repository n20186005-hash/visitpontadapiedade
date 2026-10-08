export type TopicLocale = 'pt' | 'en' | 'zh';

export interface TopicSection {
  title: string;
  body: string;
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicDef {
  /** Route path under /[locale] */
  slug: string;
  /** Short label for breadcrumbs and link cards */
  navLabel: string;
  locale: TopicLocale;
  title: string;
  description: string;
  intro: string;
  sections: TopicSection[];
  faq: TopicFaq[];
  /** Last verified / editorial review date */
  updated: string;
}

export const TOPICS: TopicDef[] = [
  // ---------------------------------------------------------------------------
  // PT — Passadiços (boardwalk)
  // ---------------------------------------------------------------------------
  {
    slug: 'passadicos-ponta-da-piedade',
    navLabel: 'Passadiços da Ponta da Piedade',
    locale: 'pt',
    title:
      'Passadiços da Ponta da Piedade (Lagos): Percurso, Miradouros e Acesso | Guia 2026',
    description:
      'Guia dos passadiços da Ponta da Piedade em Lagos: percurso pela falésia, miradouros, tempo de caminhada, acesso e dicas para visitar as grutas douradas do Algarve.',
    intro:
      'Os passadiços de madeira da Ponta da Piedade são a forma mais calma e segura de contemplar as falésias douradas de Lagos sem descer ao nível do mar. Este guia reúne o percurso, os principais miradouros e a melhor forma de chegar, para planear a sua visita com antecedência.',
    sections: [
      {
        title: 'O percurso dos passadiços',
        body: 'O passadiço principal corre ao longo do topo da falésia, a partir da zona do farol, e prolonga-se pela costa oriental. É plano, em madeira e protegido por guardas, pelo que é adequado a quase todas as idades. A passagem com calma, parando nos miradouros, demora cerca de 20 a 30 minutos num dos lados, ou cerca de uma hora se fizer a volta completa pelos dois lados.',
      },
      {
        title: 'Principais miradouros',
        body: 'Do lado leste destaca-se o miradouro sobre as pilares rochosos e a água turquesa; do lado oeste, a zona mais alta e aberta é o melhor ponto para fotografar o arco de pedra e ver o pôr do sol sobre o Atlântico. Vários bancos e plataformas permitem descansar e observar as embarcações a entrarem nas grutas.',
      },
      {
        title: 'Como chegar aos passadiços',
        body: 'De Lagos centro são cerca de 10 minutos de carro ou de comboio turístico (Linha 2 / tourist train). Também pode vir a pé desde a Praia de Dona Ana (30 a 40 minutos) ou de barco, desde a Marina de Lagos. Em época alta, o acesso de carro ao extremo da estrada pode estar sujeito a restrições, pelo que muitos visitantes estacionam na cidade e terminam o percurso a pé ou de barco.',
      },
      {
        title: 'Acesso e mobilidade',
        body: 'O passadiço e os miradouros são acessíveis a cadeiras de rodas e carrinhos de bebé. Já as escadas de pedra até ao pequeno cai no sopé das falésias são íngremes, molhadas e não são acessíveis — quem quer descer deve fazê-lo apenas a pé e com calçado antiderrapante.',
      },
      {
        title: 'Dicas de visita',
        body: 'Vá de manhã cedo ou ao fim da tarde para evitar o sol forte e as multidões; o pôr do sol do lado oeste é o momento mais procurado. Leve água, protetor solar e um casaco corta-vento, pois junto ao mar venta mesmo no verão.',
      },
    ],
    faq: [
      {
        q: 'Os passadiços são de entrada livre?',
        a: 'Sim. O passadiço e os miradouros são gratuitos e de acesso livre, 24 horas por dia. Só se paga por atividades organizadas, como os passeios de barco ou caiaque.',
      },
      {
        q: 'Quanto tempo demora a visita?',
        a: 'Cerca de 1 a 2 horas, se incluir a volta completa pelos dois lados e paragens nos miradouros. Quem só quer uma vista rápida gasta 20 a 30 minutos.',
      },
      {
        q: 'Dá para ver as grutas a partir dos passadiços?',
        a: 'Vê-se o topo e a boca das grutas, mas o interior só se aprecia do mar. Para entrar nas grutas, reserve um passeio de barco ou caiaque a partir da Marina de Lagos ou da zona da Praia de Dona Ana.',
      },
      {
        q: 'Os passadiços são seguros para crianças?',
        a: 'Sim, a estrutura tem guardas e é plana. Mesmo assim, mantenha as crianças afastadas da borda da falésia sem proteção e nunca desça as escadas até ao mar com carrinhos de bebé.',
      },
      {
        q: 'Há estacionamento junto aos passadiços?',
        a: 'Há estacionamento perto do farol, mas em julho e agosto enche rapidamente e o acesso de carro ao extremo da estrada pode estar sujeito a restrições sazonais ou obras. Alternativa: estacionar em Lagos e vir de comboio turístico ou barco.',
      },
    ],
    updated: 'Outubro de 2026',
  },

  // ---------------------------------------------------------------------------
  // PT — Como chegar (how to get there)
  // ---------------------------------------------------------------------------
  {
    slug: 'como-chegar-ponta-da-piedade',
    navLabel: 'Como Chegar à Ponta da Piedade',
    locale: 'pt',
    title:
      'Como Chegar à Ponta da Piedade (Lagos): Carro, Autocarro e Barco',
    description:
      'Como chegar à Ponta da Piedade a partir de Lagos e dos principais pontos da região: carro, autocarro, comboio turístico, a pé e de barco, com dicas para evitar filas.',
    intro:
      'A Ponta da Piedade fica a cerca de 3 km a sudoeste do centro de Lagos, no Algarve. É fácil de combinar com a Praia de Dona Ana e a Praia do Camilo. Abaixo compara as formas de chegar, para escolher a mais cómoda conforme a época e o grupo.',
    sections: [
      {
        title: 'De carro',
        body: 'São cerca de 10 minutos desde o centro de Lagos pela Estrada da Ponta da Piedade. Há estacionamento perto do farol, mas em época alta o acesso ao extremo da estrada pode estar sujeito a restrições sazonais ou obras; se o parque estiver cheio, estacione na cidade e termine a viagem de comboio turístico ou barco.',
      },
      {
        title: 'Autocarro e comboio turístico',
        body: 'O comboio turístico (tourist train) e o autocarro local (Linha 2) partem do centro de Lagos e chegam perto da Ponta da Piedade. É uma opção prática e barata para evitar procurar lugar para estacionar no pico do verão.',
      },
      {
        title: 'A pé pela costa',
        body: 'Desde a Praia de Dona Ana ou a Praia do Camilo, siga o trilho costeiro até à Ponta da Piedade em cerca de 30 a 40 minutos num sentido, com vistas sobre o mar quase sempre. Leve água e protetor solar, especialmente entre junho e setembro.',
      },
      {
        title: 'De barco desde a Marina de Lagos',
        body: 'Muitos passeios de barco e caiaque partem da Marina de Lagos e passam pela Ponta da Piedade, entrando nas grutas. É a forma mais descansada de chegar "pela água" e a única que permite ver o interior das grutas de perto.',
      },
      {
        title: 'A partir do Aeroporto de Faro',
        body: 'Faro é o aeroporto mais próximo. De carro, siga a A22 até Lagos (cerca de 1 hora); também há comboio ou autocarro do aeroporto para Lagos, e a partir daí use as opções acima para chegar à Ponta da Piedade.',
      },
    ],
    faq: [
      {
        q: 'Qual é a forma mais fácil de chegar no verão?',
        a: 'O comboio turístico ou o barco a partir da Marina de Lagos evitam a procura de estacionamento, que em julho e agosto é muito difícil junto ao farol.',
      },
      {
        q: 'Dá para ir a pé desde o centro de Lagos?',
        a: 'Sim, mas são cerca de 45 minutos a 1 hora até à Ponta da Piedade. A opção mais agradável a pé é desde a Praia de Dona Ana (30 a 40 minutos) pelo trilho costeiro.',
      },
      {
        q: 'Há Uber ou Bolt até à Ponta da Piedade?',
        a: 'Sim, as aplicações de transporte funcionam em Lagos e levam até perto do farol, mas em época alta o acesso de carro ao extremo da estrada pode estar condicionado.',
      },
      {
        q: 'A Ponta da Piedade fica perto de其它 pontos de interesse?',
        a: 'Fica mesmo ao lado da Praia de Dona Ana e da Praia do Camilo, e a poucos minutos de carro do Forte da Ponta da Bandeira, junto à Marina de Lagos. Combinar os três numa mesma manhã é fácil.',
      },
    ],
    updated: 'Outubro de 2026',
  },

  // ---------------------------------------------------------------------------
  // EN — Boardwalk
  // ---------------------------------------------------------------------------
  {
    slug: 'ponta-da-piedade-boardwalk',
    navLabel: 'Ponta da Piedade Boardwalk',
    locale: 'en',
    title: 'Ponta da Piedade Boardwalk, Lagos: Trail, Viewpoints & Access',
    description:
      'Guide to the Ponta da Piedade boardwalk in Lagos: the cliff-top trail, best viewpoints, walking time, how to get there and tips for visiting the Algarve sea caves.',
    intro:
      'The wooden boardwalk at Ponta da Piedade is the calmest, safest way to admire Lagos’ golden cliffs without walking down to sea level. This guide covers the route, the main viewpoints and the easiest way to arrive, so you can plan your visit ahead of time.',
    sections: [
      {
        title: 'The boardwalk route',
        body: 'The main boardwalk runs along the top of the cliff from the lighthouse area and continues along the eastern coastline. It is flat, made of wood and fitted with railings, so it suits almost all ages. Walking it slowly and stopping at the viewpoints takes about 20–30 minutes on one side, or around an hour if you complete both sides.',
      },
      {
        title: 'Main viewpoints',
        body: 'On the east side, the viewpoint over the rock pillars and turquoise water is the highlight; on the west side, the high open ground is the best spot to photograph the stone arch and to watch the sunset over the Atlantic. Several benches and platforms let you rest and watch small boats entering the caves.',
      },
      {
        title: 'How to reach the boardwalk',
        body: 'From central Lagos it is about a 10-minute drive or tourist-train ride (Line 2 / tourist train). You can also walk from Praia de Dona Ana (30–40 minutes) or arrive by boat from Lagos Marina. In peak season, vehicle access to the end of the road can be restricted, so many visitors park in town and finish the trip on foot or by boat.',
      },
      {
        title: 'Accessibility',
        body: 'The boardwalk and viewpoints are accessible to wheelchairs and pushchairs. The stone steps down to the small pier at the cliff foot are steep, often wet and not accessible — only go down on foot with non-slip shoes.',
      },
      {
        title: 'Visiting tips',
        body: 'Go early in the morning or late afternoon to avoid the strong sun and crowds; the west-side sunset is the most popular moment. Bring water, sun protection and a windproof jacket, as it is breezy by the sea even in summer.',
      },
    ],
    faq: [
      {
        q: 'Is the boardwalk free to enter?',
        a: 'Yes. The boardwalk and viewpoints are free and open 24 hours a day. You only pay for organised activities such as boat or kayak tours.',
      },
      {
        q: 'How long does a visit take?',
        a: 'About 1–2 hours if you do both sides and stop at the viewpoints. A quick look takes 20–30 minutes.',
      },
      {
        q: 'Can you see the caves from the boardwalk?',
        a: 'You can see the tops and mouths of the caves, but the interiors are only appreciated from the water. For that, book a boat or kayak tour from Lagos Marina or the Praia de Dona Ana area.',
      },
      {
        q: 'Is the boardwalk safe for children?',
        a: 'Yes, the structure is railed and flat. Still, keep children away from the unguarded cliff edge and never take a pushchair down the steps to the sea.',
      },
      {
        q: 'Is there parking near the boardwalk?',
        a: 'There is parking near the lighthouse, but in July and August it fills quickly and vehicle access to the end of the road can be restricted by seasonal measures or works. Alternative: park in Lagos and come by tourist train or boat.',
      },
    ],
    updated: 'October 2026',
  },

  // ---------------------------------------------------------------------------
  // EN — Parking
  // ---------------------------------------------------------------------------
  {
    slug: 'ponta-da-piedade-parking',
    navLabel: 'Ponta da Piedade Parking',
    locale: 'en',
    title: 'Ponta da Piedade Parking, Lagos: Where to Park & How to Get There',
    description:
      'Where to park for Ponta da Piedade in Lagos, access restrictions and the easiest ways to arrive by car, tourist train or boat.',
    intro:
      'Parking at Ponta da Piedade is limited and gets busy in summer, so knowing your options before you leave Lagos saves time. This page explains where cars can park, the access limits to expect and the car-free ways to arrive.',
    sections: [
      {
        title: 'Parking near the lighthouse',
        body: 'There is parking near the lighthouse and along the access road. It is not a large formal lot, and in July and August it fills around midday and late afternoon. Note that vehicle access to the very end of the road can be restricted by seasonal measures or municipal works, so the furthest spaces are not always available.',
      },
      {
        title: 'Paid alternatives',
        body: 'If the clifftop parking is full, use paid parking at Praia de Dona Ana, Praia do Camilo or in central Lagos, then walk or take the tourist train the last stretch. This is the most reliable plan on a summer afternoon.',
      },
      {
        title: 'By tourist train or bus',
        body: 'The Lagos tourist train (Linha 2 / tourist train) and the local bus run from central Lagos close to Ponta da Piedade. They avoid the parking hunt entirely and are cheap.',
      },
      {
        title: 'By boat',
        body: 'Boat and kayak tours depart from Lagos Marina and the Dona Ana / Ponta da Piedade area. Arriving by water means you skip road access and the parking question altogether, and you see the caves up close.',
      },
      {
        title: 'Tips to avoid the queues',
        body: 'Arrive before 10:00 or after 17:00 in high season, travel off-peak in spring or autumn, and consider leaving the car in Lagos. Always check current access signs on site, as arrangements can change during works.',
      },
    ],
    faq: [
      {
        q: 'Is there free parking at Ponta da Piedade?',
        a: 'There is parking near the lighthouse, but it can be limited or subject to seasonal restrictions and is not a large formal free lot. Paid parking nearby (beaches, town centre) is a dependable backup.',
      },
      {
        q: 'Can I drive all the way to the lighthouse?',
        a: 'Usually yes, but vehicle access to the end of the road can be restricted by seasonal measures or municipal works, especially in summer. Follow the on-site signs.',
      },
      {
        q: 'What is the easiest option in July and August?',
        a: 'Park in Lagos and take the tourist train or a boat tour. It removes the uncertainty of finding a clifftop space.',
      },
      {
        q: 'Is there parking for motorhomes or large vehicles?',
        a: 'The clifftop area is tight; large vehicles are better left in Lagos. Use the town or beach car parks and continue on foot or by train.',
      },
    ],
    updated: 'October 2026',
  },

  // ---------------------------------------------------------------------------
  // EN — Boat tours
  // ---------------------------------------------------------------------------
  {
    slug: 'ponta-da-piedade-boat-tours',
    navLabel: 'Ponta da Piedade Boat Tours',
    locale: 'en',
    title: 'Ponta da Piedade Boat Tours & Kayak Trips from Lagos',
    description:
      'Ponta da Piedade boat tours and kayak trips from Lagos: what is included, where they depart, typical prices and duration, and safety tips for the sea caves.',
    intro:
      'A boat trip is the only way to enter the sea caves of Ponta da Piedade, and it is the highlight most visitors remember. This guide explains the types of tours, where they leave from, what to expect and how to choose safely.',
    sections: [
      {
        title: 'Types of tours',
        body: 'Small motorboats and traditional wooden boats take you slowly between the arches and into the wider grottoes; kayaks and paddleboards let you glide closer to the rock. Some tours focus on the caves, others combine caves with the coastline toward Praia da Luz or the Benagil area.',
      },
      {
        title: 'Where tours depart',
        body: 'Most boat tours leave from Lagos Marina; many also leave from the Praia de Dona Ana / Ponta da Piedade side. Kayak and SUP rentals operate from the same areas. Prices and schedules vary with the season and sea state, so compare a few operators.',
      },
      {
        title: 'Duration and price',
        body: 'A typical cave-focused trip lasts about 1–2 hours. Adult boat or kayak experiences usually cost roughly €20–€35 per person; children often get a discount (about €10–€15). In peak season, book online or at the marina in advance.',
      },
      {
        title: 'What you will see',
        body: 'The route passes the golden cliffs, the "Elephant" and "Camel" rock formations, the natural stone arch and several grottoes where the seawater glows an intense blue in the sunlight. Captains often point out the named rocks as you go.',
      },
      {
        title: 'Safety and best conditions',
        body: 'Life jackets are provided and the trips follow the sea state. Tours are paused in strong wind or rough seas, so pick a calm morning in spring or autumn for the smoothest ride. Swimming inside the caves is not recommended because the currents are strong and unpredictable.',
      },
    ],
    faq: [
      {
        q: 'Do I need to book in advance?',
        a: 'In peak season (July–August) yes — book online or at Lagos Marina early. In spring and autumn you can usually arrange a trip on the same day.',
      },
      {
        q: 'Are boat tours suitable for families?',
        a: 'Yes. Small boat and kayak tours are family-friendly, with life jackets for all ages. The stone steps to the sea are not needed — you board near the water.',
      },
      {
        q: 'What is the difference between a boat and a kayak tour?',
        a: 'Motorboats and wooden boats are stable and cover more distance with a guide; kayaks let you get closer to the rocks and into tighter gaps, but need some paddling effort.',
      },
      {
        q: 'Can I swim in the caves?',
        a: 'It is not recommended. Currents along the cliffs are strong and unpredictable; for swimming, use the supervised nearby beaches (Dona Ana, Camilo, Batata) within the marked areas.',
      },
      {
        q: 'How long is a typical boat tour?',
        a: 'About 1–2 hours for a cave-focused trip. Combined coastline tours can be longer.',
      },
    ],
    updated: 'October 2026',
  },

  // ---------------------------------------------------------------------------
  // EN — Sea caves
  // ---------------------------------------------------------------------------
  {
    slug: 'ponta-da-piedade-caves',
    navLabel: 'Ponta da Piedade Sea Caves',
    locale: 'en',
    title: 'Ponta da Piedade Sea Caves, Lagos: How to See Them by Boat',
    description:
      'The sea caves of Ponta da Piedade in Lagos: how to visit them by boat, the most famous grottoes, the geology behind them and photography tips.',
    intro:
      'The sea caves are the signature of Ponta da Piedade — golden Miocene limestone hollowed by the Atlantic into arches, tunnels and glowing blue grottoes. They can only really be seen from the water, so this guide explains the best way to experience them.',
    sections: [
      {
        title: 'Why the caves exist',
        body: 'The cliffs are limestone laid down in shallow seas during the Miocene epoch, about 15–20 million years ago. Over millions of years, wave action and weathering carved the softer rock into arches, stacks and caves, while harder layers remained as the named rock formations.',
      },
      {
        title: 'The most famous grottoes',
        body: 'Among the best known are the larger cathedral-like caves where the ceiling opens to the sky, the "Blue Grotto" where sunlight turns the water an intense fluorescent blue, and the narrower tunnels a small boat can slip through. Exact names vary by operator, but the golden "Elephant" and "Camel" rocks are easy to spot.',
      },
      {
        title: 'How to visit',
        body: 'Take a boat or kayak tour from Lagos Marina or the Praia de Dona Ana / Ponta da Piedade side. From the boardwalk above you can see the cave mouths, but only a boat enters them. Tours run roughly 1–2 hours and follow the sea state.',
      },
      {
        title: 'Best light for photos',
        body: 'Mid-morning front light makes the water bluest and clearest; late afternoon is softer and golden. Inside a cave, the light is dim and the boat rocks, so use a wide aperture or your phone’s night / stabiliser mode. Drones are restricted locally — check the rules before flying.',
      },
      {
        title: 'Responsible visiting',
        body: 'Stay with licensed operators, wear the life jacket provided and never swim into the caves against the current. The cliffs are a protected natural landscape, so take nothing but photos.',
      },
    ],
    faq: [
      {
        q: 'Can you visit the caves without a boat?',
        a: 'You can see the cave mouths from the clifftop boardwalk, but entering them requires a boat or kayak tour from Lagos Marina or the Dona Ana area.',
      },
      {
        q: 'What is the "Blue Grotto"?',
        a: 'It is one of the grottoes where sunlight reflecting off the white sand and limestone makes the seawater glow an intense blue. The exact cave varies by tour, but most boat trips pass it.',
      },
      {
        q: 'How old are the rocks?',
        a: 'The limestone formed during the Miocene epoch, roughly 15–20 million years ago; the caves themselves were shaped much more recently by waves and weather.',
      },
      {
        q: 'When is the best time for a cave boat trip?',
        a: 'A calm morning in spring or autumn gives the smoothest ride and clearest water. Tours pause in strong wind or rough seas.',
      },
    ],
    updated: 'October 2026',
  },
];

export function getTopic(slug: string, locale: TopicLocale): TopicDef | undefined {
  return TOPICS.find((t) => t.slug === slug && t.locale === locale);
}
