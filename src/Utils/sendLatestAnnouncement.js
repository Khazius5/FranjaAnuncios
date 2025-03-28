const axios = require('axios');
const { htmlToText } = require('html-to-text');
const { EmbedBuilder } = require('discord.js');

module.exports = async function sendLatestAnnouncement(client) {
  const server = client.guilds.cache.get(process.env.SERVER_ID);
  const channel = server.channels.cache.get(process.env.CHANNEL_ID);
  try {
    const response = await axios.get(`${process.env.URL}0/1?idMateria=`);
    const jsonData = response.data;

    if (jsonData.mensajes && jsonData.mensajes.length > 0) {
      const ultimoAnuncio = jsonData.mensajes[0];
      
      // Convertimos HTML a texto y elimina más de 2 saltos de línea consecutivos
      let cuerpoTexto = htmlToText(ultimoAnuncio.cuerpo);
      cuerpoTexto = cuerpoTexto.replace(/\n{2,}/g, '\n'); // Reemplaza saltos consectuvos con uno
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(ultimoAnuncio.materia)
        .setAuthor({ name: `${ultimoAnuncio.fecha}` })
        .setDescription(cuerpoTexto)
        .setTimestamp()
        .setFooter({ text: `${ultimoAnuncio.autor}` });
      //channel.send({ embeds: [exampleEmbed] });
      console.log('Anuncio enviado:', ultimoAnuncio.titulo);
    }
  } catch (error) {
    console.error('Error al obtener el JSON:', error);
  }
}
