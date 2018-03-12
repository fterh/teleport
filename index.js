require('dotenv').config();

/* Require Telegraf and related modules */
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base')
const {leave} = Stage;

/* Require general, application-wide modules */
const responses = require('./responses/responses');
const modules = require('./modules/modules');

/* Require middleware */
const argv = require('./utils/middleware/argv');

/* Create scene manager
"Ma'am, stop creating a scene." "Can I speak to your manager?" */
const stage = new Stage();
stage.register(modules.streetview.scene);

/* Autobots, roll out */
const teleport = new Telegraf(process.env.TELEGRAM_TOKEN);

/* Register middlewares */
teleport.use(session());
teleport.use(stage.middleware());

teleport.use(argv);

/* General commands */
teleport.start((ctx) => ctx.reply(responses.start));
teleport.command('help', (ctx) => ctx.reply(responses.help));

/* Module activation */
teleport.command('erp', (ctx) => ctx.reply('beep beep'));
teleport.command('streetview', modules.streetview.streetview);
teleport.command('traffic-images', (ctx) => ctx.reply('foo bar'));

teleport.startPolling();