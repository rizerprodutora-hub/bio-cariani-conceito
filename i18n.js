/* Português / English
A página é escrita em português. Este arquivo troca os textos pelo inglês
(e de volta), lembra a escolha e abre em inglês quem usa o celular em outra língua. */
(function () {
const EN = {
'Fique por dentro das nossas novidades': 'Stay up to date with everything new',
'Professor, atleta e empresário. Fundador do CTRC.': 'Teacher, athlete and entrepreneur. Founder of CTRC.',
'Cursos': 'Courses', 'Treinar': 'Train', 'Cupons': 'Coupons', 'Empresas': 'Business',
'Vídeo novo no canal': 'New on the channel',
'Júlio Balestrin anunciou sua aposentadoria': 'Júlio Balestrin announced his retirement',
'Seja aluno do Cariani': 'Learn with Cariani',
'Comunidade e curso': 'Community and course',
'Apoio, conhecimento e motivação pra transformar físico, mente e estilo de vida.': 'Support, knowledge and motivation to transform body, mind and lifestyle.',
'Pra quem quer acompanhamento contínuo e uma turma junto.': 'For those who want ongoing guidance and a group to train with.',
'Quero entrar': 'Join now',
'V-Shape · 90 dias': 'V-Shape · 90 days',
'Pra homens que querem secar e ganhar músculo ao mesmo tempo': 'For men who want to lose fat and build muscle at the same time',
'Pra quem quer manter o físico sem dieta restritiva': 'For those who want to stay in shape without a restrictive diet',
'Membros do canal': 'Channel members',
'Pra quem quer os vídeos exclusivos do YouTube': 'For exclusive YouTube videos',
'Treine no CTRC': 'Train at CTRC', 'Rede CTRC': 'CTRC network',
'Treine onde ele treina': 'Train where he trains',
'Academias fundadas por Renato Cariani e Julio Balestrin.': 'Gyms founded by Renato Cariani and Julio Balestrin.',
'Ver unidades': 'See locations',
'Em breve: Criciúma, Curitiba e Santo André.': 'Coming soon: Criciúma, Curitiba and Santo André.',
'Ver tudo no site do CTRC': 'See everything on the CTRC website',
'Cupons dos parceiros': 'Partner coupons',
'Suplementos': 'Supplements', 'Manipulados': 'Compounded supplements', 'Roupas': 'Apparel',
'Toque na marca: o cupom é copiado e a loja abre na hora.': 'Tap a brand: the coupon is copied and the store opens right away.',
'Faça negócio com o CTRC': 'Do business with CTRC',
'Franquia CTRC': 'CTRC franchise', 'Leve o CTRC pra sua cidade': 'Bring CTRC to your city',
'Modelo de negócio completo, com marca e metodologia.': 'A complete business model, with brand and methodology.',
'Quero ser franqueado': 'Become a franchisee',
'Ser investidor': 'Become an investor', 'Participe da expansão da rede': 'Take part in the network’s expansion',
'Tenho um imóvel': 'I have a property', 'Seu ponto pode virar uma unidade': 'Your location could become a gym',
'Trabalhar no CTRC': 'Work at CTRC', 'Vagas abertas na rede': 'Open positions',
'Falar com o CTRC': 'Contact CTRC',
'Acompanhe nas redes': 'Follow on social media',
'Vlogs no YouTube': 'YouTube vlogs',
'8,59 mi de inscritos · vídeo novo quase todo dia': '8.59M subscribers · new video almost every day',
'Restaurante italiano raiz': 'Old-school Italian restaurant',
'Mansão de 15 milhões': 'A 15 million mansion',
'Churrasco raiz com Paulinho o Loko': 'Barbecue with Paulinho o Loko',
'O novo vizinho do Cariani': 'Cariani’s new neighbor',
'Ver todos os vídeos': 'See all videos',
'Ao vivo no canal, com Julio Balestrin': 'Live on the channel, with Julio Balestrin',
'Os donos da Growth abrem o jogo · #423': 'Growth’s owners open up · #423',
'O grande encontro com Muzy e Jorlan · #122': 'The big meetup with Muzy and Jorlan · #122',
'Ver todos os episódios': 'See all episodes',
'Treinos e dieta': 'Training and diet', 'Os mais vistos do canal': 'The channel’s most watched',
'Abdominais em casa · 7,9 mi': 'Abs at home · 7.9M',
'O pós-treino que te faz crescer · 7,3 mi': 'The post-workout that makes you grow · 7.3M',
'Como perder gordura rápido · 5,7 mi': 'How to lose fat fast · 5.7M',
'11,4 mi': '11.4M', '8,59 mi': '8.59M', '2,7 mi': '2.7M', '1,8 mi': '1.8M', '1,2 mi': '1.2M',
'Conhecer o site completo': 'See the full website',
'Conceito criado pela Rizer. Não é a página oficial.': 'Concept by Rizer. Not the official page.',
'Fechar': 'Close',
'Seja aluno': 'Learn with him',
'Comunidade de apoio, conhecimento e motivação pra transformar físico, mente e estilo de vida.': 'A community of support, knowledge and motivation to transform body, mind and lifestyle.',
'Programa de 90 dias': '90-day program',
'Pra homens que querem perder gordura e ganhar músculo ao mesmo tempo.': 'For men who want to lose fat and build muscle at the same time.',
'Ver o programa': 'See the program', 'Estilo de vida': 'Lifestyle',
'80% disciplina, 20% flexibilidade: manter o físico sem dieta restritiva.': '80% discipline, 20% flexibility: stay in shape without a restrictive diet.',
'Ver o protocolo': 'See the protocol', 'Cupom de desconto': 'Discount coupon',
'Use o cupom CARIANI na loja oficial.': 'Use the coupon CARIANI at the official store.',
'Copiar CARIANI e ir à loja': 'Copy CARIANI and go to the store',
'No canal': 'On the channel', 'Ele provou todas as barrinhas': 'He tried every protein bar',
'174 mil visualizações.': '174K views.', 'Assistir': 'Watch',
'Uberlândia, São Bernardo do Campo e Joinville. Em breve: Criciúma, Curitiba e Santo André.': 'Uberlândia, São Bernardo do Campo and Joinville. Coming soon: Criciúma, Curitiba and Santo André.',
'Franquia': 'Franchise', 'Podcast ao vivo': 'Live podcast',
'Os donos da Growth abrem o jogo': 'Growth’s owners open up',
'Episódio #423 · 473 mil visualizações.': 'Episode #423 · 473K views.',
'O grande encontro': 'The big meetup',
'Com Muzy, Balestrin, Eduardo Correa e Jorlan. Episódio #122.': 'With Muzy, Balestrin, Eduardo Correa and Jorlan. Episode #122.',
'Manipulados. Use o cupom CTRC.': 'Compounded supplements. Use the coupon CTRC.',
'Copiar CTRC e ir à loja': 'Copy CTRC and go to the store',
'Roupas fitness. Use o cupom CARIANI.': 'Fitness apparel. Use the coupon CARIANI.',
};
let lang = 'pt';
try { lang = localStorage.getItem('rc-lang') || ((navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en'); } catch (e) {}
const t = (s) => {
if (lang !== 'en' || !s) return s;
if (EN[s]) return EN[s];
const m = s.match(/^Cupom (\S+) copiado\. Abrindo a loja$/);
if (m) return `Coupon ${m[1]} copied. Opening the store`;
return s;
};
window.rcT = t;
window.rcLang = () => lang;
const orig = new Map();
function apply() {
document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
for (let n = walk.nextNode(); n; n = walk.nextNode()) {
if (n.parentElement && n.parentElement.closest('script,style,.story__text,.story__name,.lang')) continue;
if (!orig.has(n)) { const k = n.nodeValue.trim(); if (!k || !EN[k]) continue; orig.set(n, n.nodeValue); }
const o = orig.get(n), k = o.trim();
n.nodeValue = lang === 'en' ? o.replace(k, EN[k]) : o;
}
document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));
}
document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
lang = b.dataset.lang;
try { localStorage.setItem('rc-lang', lang); } catch (e) {}
apply();
}));
apply();
})();