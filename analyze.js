import fs from 'fs';
const js = fs.readFileSync('isabella.js', 'utf8');
const words = js.match(/[A-ZÁÉÍÓÚÃÕÀÂÊÔa-záéíóúãõàâêô0-9]+/g) || [];
const uniqueWords = [...new Set(words)];

// Let's find labels typically finding in forms:
const targetWords = ['Nome', 'Email', 'Telefone', 'WhatsApp', 'Veículos', 'Imóveis', 'Serviços', 'Crédito', 'Parcela', 'Simular', 'Valor', 'Prazo', 'Automóvel', 'Automóveis', 'Pesados'];

const present = targetWords.filter(w => js.includes(w) || js.includes(w.toLowerCase()) || js.includes(w.toUpperCase()));
console.log('Fields and categories found:', present);
