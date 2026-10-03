
export const site = {
  nome: 'Laura Fonseca',
  titulo: 'Psicóloga Clínica',
  crp: '05/65471',
  abordagem: 'Gestalt-terapia',
  cidade: 'Resende',
  uf: 'RJ',

  whatsapp: '5524998596030',
  telefone: '(24) 99859-6030',
  email: 'laurafonseca.psi@gmail.com',
  instagram: 'laurafonsecapsi',

  url: 'https://laurafonseca.psc.br',
};

export const waLink = (msg = `Olá, ${site.nome.split(' ')[0]}. Vi seu site e gostaria de conversar.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
