const { EmbedBuilder } = require("discord.js");
const Canva = require('canvas')
const { ocrSpace } = require("ocr-space-api-wrapper");


module.exports = async (Roverdev) => {
  Roverdev.on("messageCreate", async message => {



    if (!message?.guild || !message?.guild?.available || !message?.channel) return;
    if (message?.author?.bot || message?.webhookId) return;

    if (message.channel.id !== "1099089314132013257") return;

    if (message.guild.id !== "846548733914906664") return;

    try {



      let files = [];
      if (message.attachments.size > 0) {

        message.attachments.forEach(m => {
          files.push(m.url)
        })

      }

      function textIsImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }

      if (files.length == 0) {
        const msg = await message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("**You must provide a screenshot of a YT SS in English!**")
              .setColor("Yellow")
          ]
        })

        setTimeout(() => {
          msg.delete();
          message.delete();
        }, 3000);
        return;
      }


      if (files.length !== 2) {
        return message.reply({
          embeds: [new EmbedBuilder().setTitle("Please Provide 2 SS of you being Subbcribed to both of the channels!")]
        }).then(msg => {
          setTimeout(() => {
            message.delete();
            msg.delete()
          }, 3000);
        })
      }
      function attachIsImage(msgAttach) {
        url = msgAttach.url || null;
        imagename = msgAttach.name || `Unknown`;
        return url.indexOf(`png`, url.length - 3) !== -1 ||
          url.indexOf(`jpeg`, url.length - 4) !== -1 ||
          url.indexOf(`gif`, url.length - 3) !== -1 ||
          url.indexOf(`jpg`, url.length - 3) !== -1;
      }

      const embed = new EmbedBuilder()
        .setTitle(`<a:SSLoading:1137184990669590568> Proccessing \`${files.length}\` screenshots!`)
        .setColor("Green")
        .setTimestamp()

      message.reply({ embeds: [embed] }).then(async f => {

        let Verifed = {
          Alex: false,
          Chauvin: false,
        }



        let SSPictures = []

        Verifed.Alex = false
        Verifed.Chauvin = false

        let number = 0

        setTimeout(async () => {

          const img = await Canva.loadImage(files[0]);
          const canvas = Canva.createCanvas(img.width, img.height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const Data = await ocrSpace(files[0], {
            apikey: 'K81970654088957',
            language: 'eng',
            isOverlayRequired: true,
            scale: true,
            isTable: true,
            OCREngine: 2,
          })

          if (!Data?.ParsedResults) {
            f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
            f.embeds[0].data.description = `Could not Verify Screenshots cause of No data! Please Try again.`
            const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
            f.edit({ embeds: [embed] }).then((ii) => {
              setTimeout(async () => {
                message.delete()
                ii.delete()
                f.delete()
              }, 6000)
            })
          }

          let text = Data?.ParsedResults[0]?.ParsedText

          if (text == undefined) {
            f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
            f.embeds[0].data.description = `Could not Verify Screenshots cause of Ratelimit!\n> This means you hit ratelimit for 10min, Please contact: <#1085511080975011840> and send proof there!`
            const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
            f.edit({ embeds: [embed] }).then((ii) => {
              setTimeout(async () => {
                message.delete()
                ii.delete()
                f.delete()
              }, 10000)
            })
            return console.log("Ratelimit!")
          }

          if (Verifed.Alex == true && Verifed.Chauvin == true) {
            f.embeds[0].data.description = `Successfully Verifed 2/2`
            f.edit({ embeds: [f.embeds[0]] })


            Roverdev.channels.cache.get("1137146402145828965").send({ files: SSPictures, content: `${message.author} Verifed their screenshots in <#1099089314132013257> and got the Sub Role!${String(message.content).length > 1 ? `\n> Message Content: ${message.content}` : ``}` })

            f.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`<a:VerifedGold:1122690023721017444> Successfully Verifed, Check out <#1085510138284224592>!`)
                  .setColor("Green")
              ],
              content: `${message.author}`
            }).then((msg112) => {
              message.guild.members.cache.get(message.author.id).roles.add("1085507067328081991")
              setTimeout(async () => {
                message.delete()
                msg112.delete()
                f.delete()
              }, 5000)
            })
            return;
          }


          if (text.toLowerCase().includes("syntaxcodez") && text.toLowerCase().includes("subscribed")) {
            if (Verifed.Chauvin == true) {
              f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
              f.embeds[0].data.description = `Could not Verify the \`${number == "1" ? 2 : 1}\` Screenshot, Because Chauvin YT SS has already been verifed!`
              const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")

              setTimeout(async () => {
                message.delete()
                f.delete()
              }, 10000)

              return f.edit({ embeds: [embed] })
            }

            number++
            Verifed.Chauvin = true
            f.embeds[0].data.description = `Successfully Verifed ${number}/2`
            f.edit({ embeds: [f.embeds[0]] })
            SSPictures.push(canvas.toBuffer())
          }
          if (text.toLowerCase().includes("alexdev") || text.toLowerCase().includes("alexdev7518") && text.toLowerCase().includes("subscribed")) {
            if (Verifed.Alex == true) {

              f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
              f.embeds[0].data.description = `Could not Verify the \`${number == "1" ? 2 : 1}\` Screenshot, Because AlexDev YT SS has already been verifed!`
              const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")

              setTimeout(async () => {
                message.delete()
                f.delete()
              }, 10000)

              return f.edit({ embeds: [embed] })
            }

            number++
            Verifed.Alex = true
            f.embeds[0].data.description = `Successfully Verifed ${number}/2`
            f.edit({ embeds: [f.embeds[0]] })

            SSPictures.push(canvas.toBuffer())
          }

          setTimeout(async () => {
            const img1 = await Canva.loadImage(files[1]);
            const canvas1 = Canva.createCanvas(img1.width, img1.height);
            const ctx1 = canvas1.getContext("2d");
            ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);


            const Data1 = await ocrSpace(files[1], {
              apikey: 'K81970654088957',
              language: 'eng',
              isOverlayRequired: true,
              scale: true,
              isTable: true,
              OCREngine: 2,
            })

            let text1 = Data1?.ParsedResults !== undefined ? Data1?.ParsedResults[0]?.ParsedText : Data1?.ParsedResults


            if (text1 == undefined || Data1?.ParsedResults == undefined) {
              f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
              f.embeds[0].data.description = `Could not Verify Screenshots cause of Ratelimit!\n> This means you hit ratelimit for 10min, Please contact: <#1085511080975011840> and send proof there!`
              const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
              f.edit({ embeds: [embed] }).then((ii) => {
                setTimeout(async () => {
                  message.delete()
                  ii.delete()
                }, 10000)
              })
              return console.log("Ratelimit!")
            }


            if (Verifed.Alex == true && Verifed.Chauvin == true) {
              f.embeds[0].data.description = `Successfully Verifed 2/2`
              f.edit({ embeds: [f.embeds[0]] })


              Roverdev.channels.cache.get("1137146402145828965").send({ files: SSPictures, content: `${message.author} Verifed their screenshots in <#1099089314132013257> and got the Sub Role!${String(message.content).length > 1 ? `\n> Message Content: ${message.content}` : ``}` })

              f.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`<a:VerifedGold:1122690023721017444> Successfully Verifed, Check out <#1085510138284224592>!`)
                    .setColor("Green")
                ],
                content: `${message.author}`
              }).then((msg112) => {
                message.guild.members.cache.get(message.author.id).roles.add("1085507067328081991")
                setTimeout(async () => {
                  message.delete()
                  msg112.delete()
                  f.delete()
                }, 5000)
              })
              return;
            }

            if (text1 == undefined) {
              f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
              f.embeds[0].data.description = `Could not Verify Screenshots cause of Ratelimit!\n> This means you hit ratelimit for 10min, Please contact: <#1085511080975011840> and send proof there!`
              const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
              f.edit({ embeds: [embed] }).then((ii) => {
                setTimeout(async () => {
                  message.delete()
                  ii.delete()
                }, 10000)
              })
              return console.log("Ratelimit!")
            }


            if (text1.toLowerCase().includes("syntaxcodez") && text1.toLowerCase().includes("subscribed")) {
              if (Verifed.Chauvin == true) {

                if (Verifed.Alex == true && Verifed.Chauvin == true) {
                  f.embeds[0].data.description = `Successfully Verifed 2/2`
                  f.edit({ embeds: [f.embeds[0]] })


                  Roverdev.channels.cache.get("1137146402145828965").send({ files: SSPictures, content: `${message.author} Verifed their screenshots in <#1099089314132013257> and got the Sub Role!${String(message.content).length > 1 ? `\n> Message Content: ${message.content}` : ``}` })

                  f.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`<a:VerifedGold:1122690023721017444> Successfully Verifed, Check out <#1085510138284224592>!`)
                        .setColor("Green")
                    ],
                    content: `${message.author}`
                  }).then((msg112) => {
                    message.guild.members.cache.get(message.author.id).roles.add("1085507067328081991")
                    setTimeout(async () => {
                      message.delete()
                      msg112.delete()
                      f.delete()
                    }, 5000)
                  })
                  return;
                }

                f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
                f.embeds[0].data.description = `Could not Verify the \`${number == "1" ? 2 : 1}\` Screenshot, Because SyntaxCodez YT SS has already been verifed!`
                const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")

                setTimeout(async () => {
                  message.delete()
                  f.delete()
                }, 10000)

                return f.edit({ embeds: [embed] })
              }

              number++
              Verifed.Chauvin = true
              f.embeds[0].data.description = `Successfully Verifed ${number}/2`
              f.edit({ embeds: [f.embeds[0]] })
              SSPictures.push(canvas1.toBuffer())
            }
            if (text1.toLowerCase().includes("alexdev") || text1.toLowerCase().includes("alexdev7518") && text1.toLowerCase().includes("subscribed")) {

              if (Verifed.Alex == true && Verifed.Chauvin == true) {
                f.embeds[0].data.description = `Successfully Verifed 2/2`
                f.edit({ embeds: [f.embeds[0]] })


                Roverdev.channels.cache.get("1137146402145828965").send({ files: SSPictures, content: `${message.author} Verifed their screenshots in <#1099089314132013257> and got the Sub Role!${String(message.content).length > 1 ? `\n> Message Content: ${message.content}` : ``}` })

                f.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`<a:VerifedGold:1122690023721017444> Successfully Verifed, Check out <#1085510138284224592>!`)
                      .setColor("Green")
                  ],
                  content: `${message.author}`
                }).then((msg112) => {
                  message.guild.members.cache.get(message.author.id).roles.add("1085507067328081991")
                  setTimeout(async () => {
                    message.delete()
                    msg112.delete()
                    f.delete()
                  }, 5000)
                })
                return;
              }

              if (Verifed.Alex == true) {

                f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
                f.embeds[0].data.description = `Could not Verify the \`${number == "1" ? 2 : 1}\` Screenshot, Because AlexDev YT SS has already been verifed!`
                const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")

                setTimeout(async () => {
                  message.delete()
                  f.delete()
                }, 10000)

                return f.edit({ embeds: [embed] })
              }

              number++
              Verifed.Alex = true
              f.embeds[0].data.description = `Successfully Verifed ${number}/2`
              f.edit({ embeds: [f.embeds[0]] })
              SSPictures.push(canvas1.toBuffer())
            }

            setTimeout(() => {
              if (Verifed.Alex == true && Verifed.Chauvin == true) {
                f.embeds[0].data.description = `Successfully Verifed 2/2`
                f.edit({ embeds: [f.embeds[0]] })


                Roverdev.channels.cache.get("1137146402145828965").send({ files: SSPictures, content: `${message.author} Verifed their screenshots in <#1099089314132013257> and got the Sub Role!${String(message.content).length > 1 ? `\n> Message Content: ${message.content}` : ``}` })

                f.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`<a:VerifedGold:1122690023721017444> Successfully Verifed, Check out <#1085510138284224592>!`)
                      .setColor("Green")
                  ],
                  content: `${message.author}`
                }).then((msg112) => {
                  message.guild.members.cache.get(message.author.id).roles.add("1085507067328081991")
                  setTimeout(async () => {
                    message.delete()
                    msg112.delete()
                    f.delete()
                  }, 5000)
                })
              }

              if (Verifed.Alex == false) {
                f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
                f.embeds[0].data.description = `Could not Verify Alex's Subscribtion Screenshot!`
                const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
                f.edit({ embeds: [embed] }).then((ii) => {
                  setTimeout(async () => {
                    message.delete()
                    ii.delete()
                  }, 4000)
                })
                return console.log("Alex Sub not Verifed!")
              }

              if (Verifed.Chauvin == false) {
                f.embeds[0].data.title = `<a:Denied:1122292450766114827> Faild to Process \`${files.length}\` screenshots!`
                f.embeds[0].data.description = `Could not Verify SyntaxCodez's Subscribtion Screenshot!`
                const embed = EmbedBuilder.from(f.embeds[0]).setColor("Red")
                f.edit({ embeds: [embed] }).then((ii) => {
                  setTimeout(async () => {
                    message.delete()
                    ii.delete()
                  }, 4000)
                })
                return console.log("SyntaxCodez Sub not Verifed!")
              }
            }, 500);
          }, 500)
        }, 500);
      })
    } catch (e) {
      console.log(e)
      return message.reply({ content: `What Has occurred here? \n > \`${e.message}\`` }).then(m => setTimeout(() => { message.delete(); m.delete() }, 15000))
    }
  })
}