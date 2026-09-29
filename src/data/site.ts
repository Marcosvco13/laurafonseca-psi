// Fonte única dos dados da Laura. Atualizar aqui reflete na página inteira,
// no rodapé, nos botões de WhatsApp e no JSON-LD de SEO.
export const site = {
  nome: 'Laura Fonseca',
  titulo: 'Psicóloga Clínica',
  crp: '05/65471',
  abordagem: 'Gestalt-terapia',
  cidade: 'Resende',
  uf: 'RJ',

  // só dígitos, com DDI — vira o link wa.me
  whatsapp: '5524998596030',
  telefone: '(24) 99859-6030',
  email: 'laurafonseca.psi@gmail.com',
  instagram: 'laurafonseca.psi',

  // TODO: dados reais do consultório
  endereco: {
    rua: 'Rua Exemplo, 000 — sala 00',
    bairro: 'Centro',
    cep: '',
  },
  horarios: 'Seg a qui, 8h às 19h',
  horariosSchema: 'Mo-Th 08:00-19:00',

  // TODO: domínio definitivo (também em astro.config.mjs)
  url: 'https://www.laurafonseca.com.br',

  atendeDesde: 2015,

};

export const waLink = (msg = `Olá, ${site.nome.split(' ')[0]}. Vi seu site e gostaria de conversar.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
