require('dotenv').config();
const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    PermissionsBitField 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// --------------------------------------------------------
// --------------------------------------------------------
// LISTA COMPLETA DE BRAINROTS
// --------------------------------------------------------
const brainrots = [
  { name: 'Los puggies', baseM: 30, basePrice: 2.5, multiplier: 0.01, aliases: ['puggies','lospuggies','pug','puggie','lp'], formula: "(M - 30) × 0.01 + 2.5" },
  { name: 'La spooky grande', baseM: 24.5, basePrice: 3, multiplier: 0.02, aliases: ['laspookygrande','spooky','spook','spookygrande','lsg'], formula: "(M - 24.5) × 0.02 + 3" },
  { name: 'La taco combinasion', baseM: 35, basePrice: 4, multiplier: 0.02, aliases: ['latacocombinasion','ltc','tacocomb'], formula: "(M - 35) × 0.02 + 4" },
  { name: 'Chipso and queso', baseM: 25, basePrice: 4, multiplier: 0.02, aliases: ['chipsoandqueso','cq','chipso','queso'], formula: "(M - 25) × 0.02 + 4" },
  { name: 'Los spaghettis', baseM: 70, basePrice: 4.5, multiplier: 0.02, aliases: ['spaghettis','losspaghettis','spag'], formula: "(M - 70) × 0.02 + 4.5" },
  { name: 'Spooky and pumpky', baseM: 80, basePrice: 14, multiplier: 0.02, aliases: ['spookyandpumpky','pumpky','spump','spookypump','sp'], formula: "(M - 80) × 0.02 + 14" },
  { name: 'La casa boo', baseM: 100, basePrice: 16, multiplier: 0.03, aliases: ['lacasa','boo','casa','lcb'], formula: "(M - 100) × 0.03 + 16" },
  { name: 'Capitano moby', baseM: 160, basePrice: 45, multiplier: 0.05, aliases: ['capitanomoby','cm','moby','cap'], formula: "(M - 160) × 0.05 + 45" },
  { name: 'Headless horseman', baseM: 175, basePrice: 300, multiplier: 0.25, aliases: ['headless','hh','horseman','head'], formula: "(M - 175) × 0.25 + 300" },
  { name: 'Meowl', baseM: 400, basePrice: 400, multiplier: 0.3, aliases: ['meowl','meow','meo','miau'], formula: "(M - 400) × 0.3 + 400" },
  { name: 'Esok sekolah', baseM: 30, basePrice: 1, multiplier: 0.01, aliases: ['esoksekolah','es','sekolah','esok'], formula: "(M - 30) × 0.01 + 1" },
  { name: 'La grande combinasion', baseM: 10, basePrice: 1.5, multiplier: 0.01, aliases: ['lagrandecombinasion','lgc','grande','lgr'], formula: "(M - 10) × 0.01 + 1.5" },
  { name: 'Los bros', baseM: 24, basePrice: 3, multiplier: 0.02, aliases: ['losbros','lb','bros','br'], formula: "(M - 24) × 0.02 + 3" },
  { name: 'Los hotspositos', baseM: 20, basePrice: 3.5, multiplier: 0.02, aliases: ['loshotspositos','lhp','hots','positos'], formula: "(M - 20) × 0.02 + 3.5" },
  { name: 'Nuclearo dinossauro', baseM: 15, basePrice: 3.5, multiplier: 0.02, aliases: ['nuclearodinossauro','nd','nuclear','dino'], formula: "(M - 15) × 0.02 + 3.5" },
  { name: 'Ketupat kepat', baseM: 35, basePrice: 4, multiplier: 0.02, aliases: ['ketupatkepat','kk','ketupat','kepat'], formula: "(M - 35) × 0.02 + 4" },
  { name: 'Ketchuru and musturu', baseM: 42.5, basePrice: 8, multiplier: 0.03, aliases: ['ketchuruandmusturu','km','musturu','ketchuru'], formula: "(M - 42.5) × 0.03 + 8" },
  { name: 'Tralaledon', baseM: 27.5, basePrice: 10, multiplier: 0.02, aliases: ['tralaledon','tr','tralale','tral'], formula: "(M - 27.5) × 0.02 + 10" },
  { name: 'La supreme combinasion', baseM: 40, basePrice: 25, multiplier: 0.11, aliases: ['lasupremecombinasion','lsc','supreme','sup'], formula: "(M - 40) × 0.11 + 25" },
  { name: 'Las sis', baseM: 17.5, basePrice: 1, multiplier: 0.02, aliases: ['lassis','ls','sis','lasi'], formula: "(M - 17.5) × 0.02 + 1" },
  { name: 'Tacorita bicicleta', baseM: 16.5, basePrice: 2, multiplier: 0.02, aliases: ['tacoritabicicleta','tb','taco','bici'], formula: "(M - 16.5) × 0.02 + 2" },
  { name: 'La extinct grande', baseM: 23.5, basePrice: 2.5, multiplier: 0.02, aliases: ['laextinctgrande','leg','extinct','ext'], formula: "(M - 23.5) × 0.02 + 2.5" },
  { name: 'Celularcini viciosini', baseM: 22.5, basePrice: 2.5, multiplier: 0.02, aliases: ['celularciniviciosini','ccv','celular','vicio'], formula: "(M - 22.5) × 0.02 + 2.5" },
  { name: 'Los tacoritas', baseM: 32, basePrice: 4.5, multiplier: 0.01, aliases: ['lostacoritas','lt','tacoritas','taco2'], formula: "(M - 32) × 0.01 + 4.5" },
  { name: 'Spaghetti tualetti', baseM: 60, basePrice: 4, multiplier: 0.01, aliases: ['spaghettitualetti','st','spaghetti','tua'], formula: "(M - 60) × 0.01 + 4" },
  { name: 'Tictac sahur', baseM: 37.5, basePrice: 5, multiplier: 0.02, aliases: ['tictacsahur','ts','tictac','sahur'], formula: "(M - 37.5) × 0.02 + 5" },
  { name: 'Los primos', baseM: 31, basePrice: 10, multiplier: 0.01, aliases: ['losprimos','lp','primos','prim'], formula: "(M - 31) × 0.01 + 10" },
  { name: 'Garama and madundung', baseM: 50, basePrice: 15, multiplier: 0.03, aliases: ['garamaandmadundung','gm','garama','madundung'], formula: "(M - 50) × 0.03 + 15" },
  { name: 'Dragon cannelloni', baseM: 200, basePrice: 80, multiplier: 0.05, aliases: ['dragoncannelloni','dc','dragon','drag'], formula: "(M - 200) × 0.05 + 80" },
  { name: 'Eviledon', baseM: 31.5, basePrice: 3, multiplier: 0.01, aliases: ['eviledon','ev','evil','edon'], formula: "(M - 31.5) × 0.01 + 3" },
  { name: 'Orcaledon', baseM: 40, basePrice: 3.5, multiplier: 0.02, aliases: ['orcaledon','orc','caledon'], formula: "(M - 40) × 0.02 + 3.5" },
  { name: 'Money money puggy', baseM: 21, basePrice: 3.5, multiplier: 0.02, aliases: ['moneymoneypuggy','mmp','puggy','money'], formula: "(M - 21) × 0.02 + 3.5" },
  { name: 'Tang tang kelentang', baseM: 33.5, basePrice: 5, multiplier: 0.02, aliases: ['tangtangkelentang','ttk','kelentang','tang'], formula: "(M - 33.5) × 0.02 + 5" },
  { name: 'Chillin chili', baseM: 25, basePrice: 8, multiplier: 0.01, aliases: ['chillinchili','cc','chili','chill'], formula: "(M - 25) × 0.01 + 8" },
  { name: 'La secret combinasion', baseM: 125, basePrice: 10, multiplier: 0.02, aliases: ['lassecretcombinasion','lsec','secret','sec'], formula: "(M - 125) × 0.02 +  10" },
  { name: 'Fragrama and chocrama', baseM: 100, basePrice: 18, multiplier: 0.03, aliases: ['fragrama','fac','chocrama','fc'], formula: "(M - 100) × 0.03 + 18" },
  { name: 'Burguro and fryuro', baseM: 150, basePrice: 25, multiplier: 0.02, aliases: ['burguroandfryuro','bf','burguro','fryuro'], formula: "(M - 150) × 0.02 + 25" },
  { name: 'Strawberry elephant', baseM: 350, basePrice: 400, multiplier: 0.3, aliases: ['strawberryelephant','se','straw','elephant'], formula: "(M - 350) × 0.3 + 400" },
  { name: 'W or L', baseM: 30, basePrice: 3, multiplier: 0.02, aliases: ['worl','w'], formula: "(M - 30) × 0.02 + 3" },
  { name: 'Los planitos', baseM: 18.5, basePrice: 3, multiplier: 0.02, aliases: ['losplanitos','planitos'], formula: "(M - 18.5) × 0.02 + 3" },
  { name: 'Fishino clownino', baseM: 15.5, basePrice: 1.5, multiplier: 0.01, aliases: ['fishinoclownino','fishino','clownino'], formula: "(M - 15.5) × 0.01 + 1.5" },
  { name: 'Lavadorito spinito', baseM: 45, basePrice: 20, multiplier: 0.03, aliases: ['lavadoritospinito','lavadorito','spinito'], formula: "(M - 45) × 0.03 + 20" },
];

// --------------------------------------------------------
// --------------------------------------------------------
// COMANDO ,price
// --------------------------------------------------------
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(",price")) return;

    const args = message.content.split(" ").slice(1);
    const query = args[0]?.toLowerCase().replace(/\s+/g,'');
    const M = parseFloat(args[1]);

    if (!query || isNaN(M)) {
        return message.reply("Uso correcto: `,price <nombre/alias> <M>`");
    }

    const brainrot = brainrots.find(b =>
        b.name.toLowerCase().replace(/\s+/g,'') === query ||
        b.aliases.some(a => a.toLowerCase().replace(/\s+/g,'') === query)
    );

    if (!brainrot) {
        return message.reply("❌ No existe ese Brainrot.");
    }

    const { name, baseM, basePrice, multiplier, formula } = brainrot;
    const operation = `(${M} - ${baseM}) × ${multiplier} + ${basePrice}`;
    const result = ((M - baseM) * multiplier + basePrice).toFixed(2);

    const embed = new EmbedBuilder()
        .setTitle(`💰 Calculadora de Precios - ${name}`)
        .setDescription(`Conversión automática usando la fórmula de **${name}**`)
        .addFields(
            { name: 'Fórmula', value: `\`${formula}\`` },
            { name: 'Operación', value: `\`${operation}\`` },
            { name: 'Resultado', value: `$${result}` }
        )
        .setFooter({ text: `Pedido por ${message.author.tag}` })
        .setColor('#2b2d31');

    message.reply({ embeds: [embed] });
});

// ----------------------------------------------------------
// ,howtoes
// ----------------------------------------------------------
client.on("messageCreate", async (msg) => {
    if (!msg.content.startsWith(",howtoes")) return;

    const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`🔒Asegurate de estar verificado en el canal verify para tener acceso a todos los canales!

🔒Busca victimas en otros servers o personas de aca si no tienen el rol ordered from site

👨‍💼Diles que usen middleman de este servidor

🕵️Te ayudaremos a asegurar el objeto

✔️Una vez realizado recibiras tu parte

🤝 Tu y el middleman se repartiran los objetos.
(Algunos te pueden dar el 100% si quieren)`);

    msg.reply({ embeds: [embed] });
});

// ----------------------------------------------------------
// COMANDO ,hits (solo roles permitidos)
// ----------------------------------------------------------
client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(",hits")) return;

    const rolesPermitidos = [
        "Middleman novato",
        "Middleman Experto",
        "Middleman supremo",
        "Staff en prueba",
        "Helper staff",
        "Staff supremo",
        "Work Manager",
        "Diseñador",
        "Director ejecutivo",
        "Moderador",
        "Lider social",
        "Lider supervisor",
        "Controlador de trades",
        "Supervisor de ventas",
        "Co-Owner",
        "comandante del servidor",
        "🪪⁎",
        "🪪⁑",
        "🪪⁂",
        "Admin",
        "♡",
        "◇",
        "♤",
        "Owner Supreme",
        "♧",
        "adm perms",
        "☆",
        "$",
        "adm perm"
    ];

    const tienePermiso = message.member.roles.cache.some(
        r => rolesPermitidos.includes(r.name)
    );

    if (!tienePermiso) {
        return message.reply("❌ No tenés permiso para usar este comando.");
    }

    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`❗**Has sido hitteado**❗  
Pero no todo son malas noticias…

**Puedes conseguir más cosas uniéndote a nosotros**

**1️⃣ Encuentra a una persona**  
**2️⃣ Dile que usan middleman en este server**  
**3️⃣ El middleman te ayudará y repartirán mitad y mitad**

📢 **Únete a nosotros**
· **Recuperarás tus cosas**  
· **Conseguirás mejores**

⚠️ **El único requisito es compartir lo que consigas 50/50 o 100% dependiendo del middleman.**`);

    const botones = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("unirme")
            .setLabel("Unirme")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId("salir")
            .setLabel("Salir")
            .setStyle(ButtonStyle.Danger)
    );

    await message.reply({ embeds: [embed], components: [botones] });
});

// ----------------------------------------------------------
// BOTONES UNIRME Y SALIR
// ----------------------------------------------------------

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const miembro = interaction.member;

    // UNIRME → da el rol
    if (interaction.customId === 'unirme') {
        try {
            await miembro.roles.add("1441177613069717702");
            await interaction.reply({ content: 'Ya sos parte del grupo, pa. Rol asignado: **𝖤𝖝𝖕𝖑𝖔𝖗𝖆𝖉𝖔𝖗** 👌', ephemeral: true });
        } catch (e) {
            await interaction.reply({ content: 'No pude darte el rol pa 😞', ephemeral: true });
        }
    }

    // SALIR → banear
    if (interaction.customId === 'salir') {
        try {
            await miembro.ban({ reason: 'El usuario presionó el botón SALIR.' });
            // No se puede responder si está baneado, así que intentamos antes del ban:
            await interaction.reply({ content: 'Fuiste baneado del servidor. Suerte pa 😔', ephemeral: true }).catch(() => {});
        } catch (e) {
            await interaction.reply({ content: 'No pude banearte pa 😶', ephemeral: true });
        }
    }
});

// ----------------------------------------------------------
// COMANDOS DE MODERACIÓN: ,ban / ,unban
// ----------------------------------------------------------

client.on("messageCreate", async (msg) => {
    if (!msg.guild) return;

    // BAN
    if (msg.content.startsWith(",ban")) {
        if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return;

        const user = msg.mentions.members.first();
        if (!user) return;
        if (!msg.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) return;
        if (user.id === msg.author.id) return;

        try {
            await user.ban({ reason: "Baneado mediante comando" });
            await msg.reply(`Usuario **${user.user.tag}** baneado.`);
        } catch (err) {
            console.error(err);
        }
    }

    // UNBAN
    if (msg.content.startsWith(",unban")) {
        if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return;

        const id = msg.content.split(" ")[1];
        if (!id) return;

        try {
            await msg.guild.members.unban(id);
            await msg.reply(`El usuario con ID **${id}** fue desbaneado.`);
        } catch (err) {
            console.error(err);
        }
    }
});

// ----------------------------------------------------------
// PURGE & CLEAR
// ----------------------------------------------------------

client.on("messageCreate", async (msg) => {
    if (!msg.guild) return;
    if (!msg.content.startsWith("!purge") && !msg.content.startsWith(",c")) return;

    if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

    const parts = msg.content.split(" ");
    const n = parseInt(parts[1]);
    if (!n || n < 1 || n > 100) return;

    try {
        await msg.channel.bulkDelete(n, true);
        const m = await msg.reply(`Se eliminaron **${n}** mensajes.`);
        setTimeout(() => m.delete().catch(() => {}), 3000);
    } catch (err) {
        console.error(err);
    }
});

// ----------------------------------------------------------
// COMANDO ,afk
// ----------------------------------------------------------

const afkUsers = new Map(); // key: userId, value: motivo

client.on("messageCreate", async (msg) => {
    if (!msg.guild || msg.author.bot) return;

    const content = msg.content;

    // Si el usuario está AFK y escribe algo, lo quitamos de AFK
    if (afkUsers.has(msg.author.id)) {
        afkUsers.delete(msg.author.id);
        await msg.reply(`Bienvenido de nuevo, <@${msg.author.id}>! Te hemos quitado el estado AFK.`);
    }

    // Comando ,afk
    if (content.startsWith(",afk")) {
        const motivo = content.slice(4).trim() || "No especificado";
        afkUsers.set(msg.author.id, motivo);
        return msg.reply(`Te has puesto AFK. Motivo: ${motivo}`);
    }

    // Verificar si alguien menciona a un usuario AFK
    if (msg.mentions.users.size > 0) {
        const afkMentions = msg.mentions.users.filter(u => afkUsers.has(u.id));
        if (afkMentions.size > 0) {
            afkMentions.forEach(u => {
                msg.reply(`<@${u.id}> está AFK. Motivo: ${afkUsers.get(u.id)}`);
            });
        }
    }
});
// ----------------------------------------------------------
// COMANDO ,r (dar rol a uno o varios roles a un usuario) solo Admin en adelante
// ----------------------------------------------------------
const allowedRolesGive = [
    "Admin",
    "🪪⁎",
    "🪪⁑",
    "🪪⁂",
    "comandante del servidor",
    "Co-Owner ",
    "Supervisor de ventas",
    "Controlador de trades",
    "Lider supervisor",
    "♡",
    "◇",
    "♤",
    "Owner Supreme",
    "♧",
    "adm perms",
    "☆",
    "$",
    "adm perm"
];

// roles que pueden ser asignados (todos los roles válidos del servidor)
const validRoles = [
    "adm perm",
    "$",
    "Bots",
    "☆",
    "adm perms",
    "♧",
    "Owner Supreme",
    "♤",
    "◇",
    "♡",
    "Admin",
    "🪪⁂",
    "🪪⁑",
    "🪪⁎",
    "comandante del server",
    "Co-Owner",
    "Supervisor de ventas",
    "Controlador de trades",
    "Lider supervisor 〃",
    "Lider social 〃",
    "Moderador",
    "Director ejecutivo",
    "Diseñador",
    "Work manager",
    "Staff supremo",
    "Helper staff",
    "Staff en prueba",
    "Middleman supremo",
    "Middleman experto",
    "Middleman novato",
    "MM Autorizado"
];

client.on("messageCreate", async (msg) => {
    if (!msg.guild || msg.author.bot) return;
    if (!msg.content.startsWith(",r")) return;

    const memberRoles = msg.member.roles.cache.map(r => r.name);
    const hasPermission = memberRoles.some(r => allowedRolesGive.includes(r));
    if (!hasPermission) return; // no hace nada si no tiene rol permitido

    const args = msg.content.slice(2).trim().split(/ +/g);
    const userId = args[0];
    const roleNames = args.slice(1); // todos los roles después del ID

    if (!userId || roleNames.length === 0) return;

    const member = await msg.guild.members.fetch(userId).catch(() => null);
    if (!member) return;

    let rolesAdded = [];

    for (const rn of roleNames) {
        if (!validRoles.includes(rn)) continue; // solo roles válidos
        const role = msg.guild.roles.cache.find(r => r.name === rn);
        if (!role) continue;

        try {
            await member.roles.add(role);
            rolesAdded.push(role.name);
        } catch (err) {
            console.error(err);
        }
    }

    if (rolesAdded.length === 0) return msg.reply("No se asignaron roles. Verifica que sean válidos.");
    msg.reply(`✅ Se han asignado los roles: ${rolesAdded.join(", ")} a <@${member.id}>.`);
});

// ---------------------------------------------------------------------------
// COMANDO ,d (quitar rol a un usuario) solo Lider supervisor 〃 en adelante
// ---------------------------------------------------------------------------

const allowedRolesRemove = [
    "Lider supervisor",
    "Controlador de trades",
    "Supervisor de ventas",
    "Co-Owner",
    "comandante del servidor",
    "🪪⁎",
    "🪪⁑",
    "🪪⁂",
    "Admin",
    "♡",
    "◇",
    "♤",
    "Owner Supreme",
    "♧",
    "adm perms",
    "☆",
    "$",
    "adm perm"
];

client.on("messageCreate", async (msg) => {
    if (!msg.guild || msg.author.bot) return;
    if (!msg.content.startsWith(",d")) return;

    const memberRoles = msg.member.roles.cache.map(r => r.name);
    const hasPermission = memberRoles.some(r => allowedRolesRemove.includes(r));
    if (!hasPermission) return;

    const args = msg.content.slice(2).trim().split(/ +/g);
    const userId = args[0];
    const roleName = args.slice(1).join(" ");

    if (!userId || !roleName) return;

    if (!validRoles.includes(roleName)) return; // no permite roles fuera de la lista

    const member = await msg.guild.members.fetch(userId).catch(() => null);
    if (!member) return;

    const role = msg.guild.roles.cache.find(r => r.name === roleName);
    if (!role) return;

    try {
        await member.roles.remove(role);
        msg.reply(`✅ El rol **${role.name}** ha sido removido de <@${member.id}>.`);
    } catch (err) {
        console.error(err);
    }
});
// ------------------------------------------------------------------------------------
// ------------------- COMANDO ,purge roles ---------------
client.on("messageCreate", async (msg) => {
    if (!msg.guild || msg.author.bot) return;

    const content = msg.content;
    if (!content.startsWith(",purge roles")) return;

    // Roles permitidos: desde "Owner Supreme" en adelante en validRoles
    const memberRoles = msg.member.roles.cache.map(r => r.name);
    const allowedRoles = validRoles.slice(validRoles.indexOf("adm perms")); 
    if (!memberRoles.some(r => allowedRoles.includes(r))) {
        return msg.reply("❌ No tienes permiso para usar este comando.");
    }

    const args = content.split(" ").slice(2); // quitar ",purge roles"
    const userId = args[0];
    if (!userId) return msg.reply("❌ Debes indicar el ID del usuario.");

    const member = await msg.guild.members.fetch(userId).catch(() => null);
    if (!member) return msg.reply("❌ Usuario no encontrado.");

    // Filtrar solo los roles válidos que tiene el usuario
    const rolesToRemove = member.roles.cache.filter(r => validRoles.includes(r.name));
    if (rolesToRemove.size === 0) return msg.reply("Este usuario no tiene roles válidos para purgar.");

    await member.roles.remove(rolesToRemove).catch(err => {
        console.error(err);
        return msg.reply("Ocurrió un error al quitar los roles.");
    });

    return msg.reply(`✅ Se han removido todos los roles válidos de <@${member.id}>.`);
});

// ----------------------------------------------------------
client.login(process.env.TOKEN);
