const {token} = require("./config.json")
const {Client, Events, SlashCommandBuilder, ActivityType} = require("discord.js")


const client = new Client({intents: []});
const owner = 'campcamping';

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.username}`);

    client.user.setPresence({
      status: 'online',
      activities: [
        {
          name: 'Control1',
          type: ActivityType.Watching
        }
      ]
    })

    const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!");

    const ban = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a selected user!")
    .addStringOption(option =>
        option.setName('userid')
            .setDescription('Choose the user to ban')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Why did you ban them?')
            .setRequired(true)
    );

    const Awhitelist = new SlashCommandBuilder()
    .setName("addwhitelist")
    .setDescription("Add a Roblox UserID to whitelist")
    .addStringOption(option => 
        option.setName('roblox')
            .setDescription('Enter a user ID')
            .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('product')
          .setDescription('Select a product for the whitelist')
          .setRequired(true)
          .addChoices(
            { name: 'AG Surface Series', value: 'surfaceseries'},
          )
   );

    const Rwhitelist = new SlashCommandBuilder()
    .setName("removewhitelist")
    .setDescription("Remove a Roblox UserID from the whitelist")
    .addStringOption(option =>
      option.setName('product')
          .setDescription('Select a product for the whitelist')
          .setRequired(true)
          .addChoices(
            { name: 'AG Surface Series', value: 'surfaceseries'},
          )
    )
    .addStringOption(option => 
        option.setName('roblox')
            .setDescription('Enter a user ID')
            .setRequired(true)
    );

    const Chewhitelist = new SlashCommandBuilder()
    .setName("checkwhitelist")
    .setDescription("Check a roblox users whitelist")
    .addStringOption(option =>
      option.setName('product')
          .setDescription('Select a product for the whitelist')
          .setRequired(true)
          .addChoices(
            { name: 'AG Surface Series', value: 'surfaceseries'},
          )
    )
    .addStringOption(option => 
        option.setName('roblox')
            .setDescription('Enter a user ID')
            .setRequired(true)
    );

    client.application.commands.create(ping);
    client.application.commands.create(Awhitelist);
    client.application.commands.create(Rwhitelist);
    client.application.commands.create(Chewhitelist);
});

client.on(Events.InteractionCreate, async interaction => {
    if(interaction.commandName === "ping"){
        interaction.reply("Pong!");
    }
    if(interaction.commandName === "addwhitelist"){
        const Pipe1 = "| "
        const Pipe2 = " |"
        if(interaction.channelId === "1311708582890180619") {
          newRow = Pipe1 + interaction.options.getString('roblox') + Pipe2
          const ProductRead = interaction.options.getString('product');
          if(ProductRead == 'surfaceseries'){
            repo = 'Accessguard'
            path = 'WhitelistDATA.md';
          }
          addRowToTable()
          interaction.reply({ content: 'User has been giving Whitelist', flags: MessageFlags.Ephemeral });
        } else {
            interaction.reply({ content: 'Not correct channel. Use shr-commands channel.', flags: MessageFlags.Ephemeral });
        };
    }
    if(interaction.commandName === "removewhitelist"){
        const Pipe1 = "| "
        const Pipe2 = " |"
        if(interaction.channelId === "1311708582890180619") {
          nameToRemove = interaction.options.getString('roblox')
          if(ProductRead == 'surfaceseries'){
            repo = 'Accessguard'
            path = 'WhitelistDATA.md';
          }
          removeRowFromTable()
          interaction.reply({ content: 'User has been removed from Whitelist', flags: MessageFlags.Ephemeral });
        } else {
            interaction.reply({ content: 'Not correct channel. Use shr-commands channel.', flags: MessageFlags.Ephemeral });
        };
    }
});


client.login(token)