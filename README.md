# the-narrator
Discord Bot for great lulz

Set up instructions:

1. Download Node.js at http://nodejs.org/
2. Head to http://discordapp.com/developers/applications/me and create new application. Save.
3. On same page, click on Bot, then Add Bot. Select above app.
4. On same page, Generate an auth token for the bot.  Copy the token and replace it in auth.js
5. On same page scroll up to App Details and find your CLIENTID.  Go to this URL, replacing CLIENTID with yours `https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8`
6. Install dependencies. Run `npm install discord.io winston -save`
7. More dependencies. Run `npm install https://github.com/woor/discord.io/tarball/gateway_v6`
8. Run the bot! `node bot.js`
