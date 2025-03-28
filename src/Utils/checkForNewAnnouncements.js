const axios = require('axios');
const { htmlToText } = require('html-to-text');
const { EmbedBuilder } = require('discord.js');
let previousTotal = 0; // Variable para almacenar el total anterior de anuncios

module.exports = async function checkForNewAnnouncements(client) {
  try {
    const response = await axios.get(`${process.env.URL}0/10?idMateria=`);
    const jsonData = response.data;
    console.log(jsonData.mensajes[0]);
    const ultimoAnuncio = jsonData.mensajes[0];
    const server = client.guilds.cache.get(process.env.SERVER_ID);
    const channel = server.channels.cache.get(process.env.CHANNEL_ID);
    if (jsonData.mensajes && Array.isArray(jsonData.mensajes)) {
      const currentTotal = jsonData.total;

      if (currentTotal > previousTotal) {
        previousTotal = currentTotal;
        
          // Convierto HTML a texto y eliminamos mas de 2 saltos de línea consecutivos
          let cuerpoTexto = htmlToText(ultimoAnuncio.cuerpo);
          cuerpoTexto = cuerpoTexto.replace(/\n{2,}/g, '\n'); // Reemplaza más de dos saltos de línea con uno

          const exampleEmbed = new EmbedBuilder()
          .setColor("490363")
          .setTitle(`:mega: ${ultimoAnuncio.materia} | ${ultimoAnuncio.titulo}`)
          .setAuthor({ name: `${ultimoAnuncio.fecha}` })
          .setDescription(cuerpoTexto)
          .setTimestamp()
          .setFooter({ text: `${ultimoAnuncio.autor}` });
        channel.send({ embeds: [exampleEmbed] });
        console.log('Nuevo anuncio enviado:', ultimoAnuncio.titulo, 'Total:', currentTotal);
      
        };
      }
  } catch (error) {
    console.error('Error al obtener el JSON:', error);
  }

}