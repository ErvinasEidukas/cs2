/* CS2 Config Builder
   Replace PERSONAL_CONFIG with your own tested config before publishing.
*/

const PERSONAL_CONFIG = `// Personal CS2 config
// Replace this sample with your own settings.
sensitivity "1"
`

const STORAGE_KEY = "cs2-config-builder-separated-v2"

const COMMANDS = [
  // ==================== MOVEMENT ====================
  ["Movement", "Move Forward", "+forward"],
  ["Movement", "Move Backward", "+back"],
  ["Movement", "Move Left", "+moveleft"],
  ["Movement", "Move Right", "+moveright"],
  ["Movement", "Jump", "+jump"],
  ["Movement", "Crouch", "+duck"],
  ["Movement", "Walk / Slow Movement", "+sprint"],
  ["Movement", "Use / Interact", "+use"],
  ["Movement", "Toggle Noclip (Practice)", "noclip"],
  ["Movement", "Enable Bunny Hop (Practice)", "sv_autobunnyhopping 1"],
  ["Movement", "Disable Bunny Hop (Practice)", "sv_autobunnyhopping 0"],
  ["Movement", "Increase Air Acceleration (Practice)", "sv_airaccelerate 1000"],
  ["Movement", "Normal Air Acceleration (Practice)", "sv_airaccelerate 12"],
  ["Movement", "Get Current Position", "getpos"],

  // ==================== WEAPONS ====================
  ["Weapons", "Fire", "+attack"],
  ["Weapons", "Secondary Fire", "+attack2"],
  ["Weapons", "Reload", "+reload"],
  ["Weapons", "Inspect Weapon", "+lookatweapon"],
  ["Weapons", "Primary Weapon", "slot1"],
  ["Weapons", "Pistol", "slot2"],
  ["Weapons", "Knife", "slot3"],
  ["Weapons", "Cycle Grenades", "slot4"],
  ["Weapons", "Bomb / Equipment", "slot5"],
  ["Weapons", "Last Weapon", "lastinv"],
  ["Weapons", "Next Weapon", "invnext"],
  ["Weapons", "Previous Weapon", "invprev"],
  ["Weapons", "Drop Weapon", "drop"],
  ["Weapons", "Toggle Auto Weapon Switch", "toggle cl_autowepswitch 0 1"],
  ["Weapons", "Toggle Recoil Crosshair", "toggle cl_crosshair_recoil 0 1"],

  // ==================== GRENADES ====================
  ["Grenades", "Equip HE Grenade", "slot6"],
  ["Grenades", "Equip Flashbang", "slot7"],
  ["Grenades", "Equip Smoke Grenade", "slot8"],
  ["Grenades", "Equip Decoy", "slot9"],
  ["Grenades", "Equip Molotov / Incendiary", "slot10"],
  ["Grenades", "Release Grenade Throw", "-attack"],
  ["Grenades", "Release Secondary Throw", "-attack2"],
  ["Grenades", "Jump Throw (Requires Alias)", "jumpthrow"],
  ["Grenades", "Quick Switch to Last Weapon", "lastinv"],

  // ==================== BUY BINDS ====================
  ["Buy binds", "Buy AK-47", "buy ak47"],
  ["Buy binds", "Buy M4A4", "buy m4a1"],
  ["Buy binds", "Buy M4A1-S", "buy m4a1_silencer"],
  ["Buy binds", "Buy AWP", "buy awp"],
  ["Buy binds", "Buy SSG 08", "buy ssg08"],
  ["Buy binds", "Buy AUG", "buy aug"],
  ["Buy binds", "Buy SG 553", "buy sg556"],
  ["Buy binds", "Buy FAMAS", "buy famas"],
  ["Buy binds", "Buy Galil AR", "buy galilar"],
  ["Buy binds", "Buy Desert Eagle", "buy deagle"],
  ["Buy binds", "Buy P250", "buy p250"],
  ["Buy binds", "Buy Five-SeveN", "buy fiveseven"],
  ["Buy binds", "Buy Tec-9", "buy tec9"],
  ["Buy binds", "Buy CZ75-Auto", "buy cz75a"],
  ["Buy binds", "Buy Dual Berettas", "buy elite"],
  ["Buy binds", "Buy MP9", "buy mp9"],
  ["Buy binds", "Buy MAC-10", "buy mac10"],
  ["Buy binds", "Buy UMP-45", "buy ump45"],
  ["Buy binds", "Buy P90", "buy p90"],
  ["Buy binds", "Buy MP7", "buy mp7"],
  ["Buy binds", "Buy MP5-SD", "buy mp5sd"],
  ["Buy binds", "Buy Nova", "buy nova"],
  ["Buy binds", "Buy XM1014", "buy xm1014"],
  ["Buy binds", "Buy MAG-7", "buy mag7"],
  ["Buy binds", "Buy Sawed-Off", "buy sawedoff"],
  ["Buy binds", "Buy M249", "buy m249"],
  ["Buy binds", "Buy Negev", "buy negev"],
  ["Buy binds", "Buy Kevlar", "buy vest"],
  ["Buy binds", "Buy Kevlar + Helmet", "buy vesthelm"],
  ["Buy binds", "Buy Defuse Kit", "buy defuser"],
  ["Buy binds", "Buy Zeus", "buy taser"],
  ["Buy binds", "Buy HE Grenade", "buy hegrenade"],
  ["Buy binds", "Buy Flashbang", "buy flashbang"],
  ["Buy binds", "Buy Smoke Grenade", "buy smokegrenade"],
  ["Buy binds", "Buy Decoy", "buy decoy"],
  ["Buy binds", "Buy Molotov", "buy molotov"],
  ["Buy binds", "Buy Incendiary Grenade", "buy incgrenade"],

  // ==================== COMMUNICATION ====================
  ["Communication", "Push-to-Talk", "+voicerecord"],
  ["Communication", "Team Chat", "messagemode2"],
  ["Communication", "All Chat", "messagemode"],
  ["Communication", "Ping", "player_ping"],
  ["Communication", "Radio Menu", "+radialradio"],
  ["Communication", "Radio Menu 2", "+radialradio2"],
  ["Communication", "Radio Menu 3", "+radialradio3"],
  ["Communication", "Toggle Clutch Mode", "toggle cl_clutch_mode 0 1"],

  // ==================== GAMEPLAY ====================
  ["Gameplay", "Scoreboard", "+showscores"],
  ["Gameplay", "Toggle Console", "toggleconsole"],
  ["Gameplay", "Switch Hands", "switchhands"],
  ["Gameplay", "Clear Decals", "r_cleardecals"],

  // ==================== RADAR ====================
  ["Radar", "Small Radar", "cl_radar_scale 0.35"],
  ["Radar", "Medium Radar", "cl_radar_scale 0.5"],
  ["Radar", "Large Radar", "cl_radar_scale 0.7"],
  ["Radar", "Increase Radar Zoom", "incrementvar cl_radar_scale 0.25 1 0.05"],
  ["Radar", "Toggle Radar Size", "toggle cl_radar_scale 0.35 0.7"],
  ["Radar", "Center Radar", "cl_radar_always_centered 1"],
  ["Radar", "Show More Map Area", "cl_radar_always_centered 0"],
  ["Radar", "Rotate Radar", "cl_radar_rotate 1"],
  ["Radar", "North-Up Radar", "cl_radar_rotate 0"],
  ["Radar", "Increase Radar Icon Size", "incrementvar cl_radar_icon_scale_min 0.4 1.25 0.1"],
  ["Radar", "Square Radar with Scoreboard", "cl_radar_square_with_scoreboard 1"],
  ["Radar", "Round Radar Shape", "cl_radar_square_with_scoreboard 0"],

  // ==================== DEMO REVIEW ====================
  ["Demo Review", "Open Demo Controls", "demoui"],
  ["Demo Review", "Play / Pause Demo", "demo_togglepause"],
  ["Demo Review", "Pause Demo", "demo_pause"],
  ["Demo Review", "Resume Demo", "demo_resume"],
  ["Demo Review", "Normal Speed (1x)", "demo_timescale 1"],
  ["Demo Review", "Slow Motion (0.25x)", "demo_timescale 0.25"],
  ["Demo Review", "Half Speed (0.5x)", "demo_timescale 0.5"],
  ["Demo Review", "Double Speed (2x)", "demo_timescale 2"],
  ["Demo Review", "Fast Forward (4x)", "demo_timescale 4"],
  ["Demo Review", "Very Fast (8x)", "demo_timescale 8"],
  ["Demo Review", "Toggle X-Ray", "toggle spec_show_xray 0 1"],
  ["Demo Review", "Next Spectated Player", "spec_next"],
  ["Demo Review", "Previous Spectated Player", "spec_prev"],
  ["Demo Review", "First-Person Spectator View", "spec_mode 1"],
  ["Demo Review", "Third-Person Spectator View", "spec_mode 3"],
  ["Demo Review", "Free Camera", "spec_mode 4"],
  ["Demo Review", "Show Demo Information", "demo_info"],
  ["Demo Review", "Mark Current Moment", "demo_marktick"],
  ["Demo Review", "Return to Marked Moment", "demo_gotomark"],
  ["Demo Review", "Skip Forward (640 Ticks)", "demo_goto 640 1 0"],
  ["Demo Review", "Skip Backward (640 Ticks)", "demo_goto -640 1 0"],

  // ==================== HUD ====================
  ["HUD", "Show Loadout", "cl_showloadout 1"],
  ["HUD", "Hide Loadout", "cl_showloadout 0"],
  ["HUD", "Toggle Loadout", "toggle cl_showloadout 0 1"],
  ["HUD", "Show FPS", "cl_showfps 1"],
  ["HUD", "Hide FPS", "cl_showfps 0"],
  ["HUD", "Show Team Equipment (Hold)", "+cl_show_team_equipment"],
  ["HUD", "Release Team Equipment Display", "-cl_show_team_equipment"],
  ["HUD", "Toggle Team Equipment Display", "toggle cl_teamid_overhead_mode 0 2"],
  ["HUD", "Show Only Death Notices", "cl_draw_only_deathnotices 1"],
  ["HUD", "Restore Normal HUD", "cl_draw_only_deathnotices 0"],

  // ==================== CROSSHAIR ====================
  ["Crosshair", "Static Crosshair", "cl_crosshairstyle 4"],
  ["Crosshair", "Classic Dynamic Crosshair", "cl_crosshairstyle 5"],
  ["Crosshair", "Small Crosshair", "cl_crosshairsize 1"],
  ["Crosshair", "Medium Crosshair", "cl_crosshairsize 3"],
  ["Crosshair", "Large Crosshair", "cl_crosshairsize 5"],
  ["Crosshair", "Thin Crosshair", "cl_crosshairthickness 0.5"],
  ["Crosshair", "Thick Crosshair", "cl_crosshairthickness 1.5"],
  ["Crosshair", "Enable Center Dot", "cl_crosshairdot 1"],
  ["Crosshair", "Disable Center Dot", "cl_crosshairdot 0"],
  ["Crosshair", "Small Gap", "cl_crosshairgap -3"],
  ["Crosshair", "Medium Gap", "cl_crosshairgap 0"],
  ["Crosshair", "Large Gap", "cl_crosshairgap 3"],
  ["Crosshair", "Green Crosshair", "cl_crosshaircolor 1"],
  ["Crosshair", "Yellow Crosshair", "cl_crosshaircolor 2"],
  ["Crosshair", "Cyan Crosshair", "cl_crosshaircolor 4"],
  ["Crosshair", "Custom Crosshair Color", "cl_crosshaircolor 5"],
  ["Crosshair", "Enable Crosshair Outline", "cl_crosshair_drawoutline 1"],
  ["Crosshair", "Disable Crosshair Outline", "cl_crosshair_drawoutline 0"],

  // ==================== PRACTICE SETUP ====================
  ["Practice Setup", "Enable Cheats", "sv_cheats 1"],
  ["Practice Setup", "End Warmup", "mp_warmup_end"],
  ["Practice Setup", "Restart Round", "mp_restartgame 1"],
  ["Practice Setup", "Remove Freeze Time", "mp_freezetime 0"],
  ["Practice Setup", "Long Defuse Round", "mp_roundtime_defuse 60"],
  ["Practice Setup", "Long Hostage Round", "mp_roundtime_hostage 60"],
  ["Practice Setup", "Long Buy Time", "mp_buytime 9999"],
  ["Practice Setup", "Buy Anywhere", "mp_buy_anywhere 1"],
  ["Practice Setup", "Disable Buy Anywhere", "mp_buy_anywhere 0"],
  ["Practice Setup", "Set Maximum Money", "mp_maxmoney 60000"],
  ["Practice Setup", "Set Starting Money", "mp_startmoney 60000"],
  ["Practice Setup", "Allow Five Grenades", "ammo_grenade_limit_total 5"],
  ["Practice Setup", "Unlimited Reserve Ammo", "sv_infinite_ammo 1"],
  ["Practice Setup", "Unlimited Ammo Without Reloading", "sv_infinite_ammo 2"],
  ["Practice Setup", "Enable CT Respawn", "mp_respawn_on_death_ct 1"],
  ["Practice Setup", "Disable CT Respawn", "mp_respawn_on_death_ct 0"],
  ["Practice Setup", "Enable T Respawn", "mp_respawn_on_death_t 1"],
  ["Practice Setup", "Disable T Respawn", "mp_respawn_on_death_t 0"],
  ["Practice Setup", "Disable Team Limits", "mp_limitteams 0"],
  ["Practice Setup", "Disable Auto Team Balance", "mp_autoteambalance 0"],
  ["Practice Setup", "Ignore Round Win Conditions", "mp_ignore_round_win_conditions 1"],
  ["Practice Setup", "Restore Round Win Conditions", "mp_ignore_round_win_conditions 0"],
  ["Practice Setup", "Enable God Mode", "god"],
  ["Practice Setup", "Enable Buddha Mode", "buddha 1"],
  ["Practice Setup", "Disable Buddha Mode", "buddha 0"],

  // ==================== GRENADE PRACTICE ====================
  ["Grenade Practice", "Show Grenade Landing Preview", "sv_grenade_trajectory_prac_pipreview 1"],
  ["Grenade Practice", "Hide Grenade Landing Preview", "sv_grenade_trajectory_prac_pipreview 0"],
  ["Grenade Practice", "Grenade Trail for 5 Seconds", "sv_grenade_trajectory_prac_trailtime 5"],
  ["Grenade Practice", "Grenade Trail for 8 Seconds", "sv_grenade_trajectory_prac_trailtime 8"],
  ["Grenade Practice", "Grenade Trail for 10 Seconds", "sv_grenade_trajectory_prac_trailtime 10"],
  ["Grenade Practice", "Rethrow Last Grenade", "sv_rethrow_last_grenade"],
  ["Grenade Practice", "Give HE Grenade", "give weapon_hegrenade"],
  ["Grenade Practice", "Give Flashbang", "give weapon_flashbang"],
  ["Grenade Practice", "Give Smoke Grenade", "give weapon_smokegrenade"],
  ["Grenade Practice", "Give Decoy", "give weapon_decoy"],
  ["Grenade Practice", "Give Molotov", "give weapon_molotov"],
  ["Grenade Practice", "Give Incendiary Grenade", "give weapon_incgrenade"],
  ["Grenade Practice", "Allow Five Grenades", "ammo_grenade_limit_total 5"],

  // ==================== AIM TRAINING ====================
  ["Aim Training", "Show Bullet Impacts", "sv_showimpacts 1"],
  ["Aim Training", "Hide Bullet Impacts", "sv_showimpacts 0"],
  ["Aim Training", "Bullet Impacts for 10 Seconds", "sv_showimpacts_time 10"],
  ["Aim Training", "Show Bullet Hit Effects", "sv_showbullethits 1"],
  ["Aim Training", "Hide Bullet Hit Effects", "sv_showbullethits 0"],
  ["Aim Training", "Enable Health Regeneration", "sv_regeneration_force_on 1"],
  ["Aim Training", "Disable Health Regeneration", "sv_regeneration_force_on 0"],
  ["Aim Training", "Give AK-47", "give weapon_ak47"],
  ["Aim Training", "Give M4A4", "give weapon_m4a1"],
  ["Aim Training", "Give M4A1-S", "give weapon_m4a1_silencer"],
  ["Aim Training", "Give AWP", "give weapon_awp"],
  ["Aim Training", "Give Desert Eagle", "give weapon_deagle"],
  ["Aim Training", "Give SSG 08", "give weapon_ssg08"],
  ["Aim Training", "Give P250", "give weapon_p250"],
  ["Aim Training", "Give MP9", "give weapon_mp9"],
  ["Aim Training", "Give UMP-45", "give weapon_ump45"],

  // ==================== BOT PRACTICE ====================
  ["Bot Practice", "Add CT Bot", "bot_add_ct"],
  ["Bot Practice", "Add T Bot", "bot_add_t"],
  ["Bot Practice", "Remove All Bots", "bot_kick"],
  ["Bot Practice", "Stop Bots", "bot_stop 1"],
  ["Bot Practice", "Allow Bots to Move", "bot_stop 0"],
  ["Bot Practice", "Prevent Bots Shooting", "bot_dont_shoot 1"],
  ["Bot Practice", "Allow Bots to Shoot", "bot_dont_shoot 0"],
  ["Bot Practice", "Place Bot at Crosshair", "bot_place"],
  ["Bot Practice", "Freeze Bots", "bot_freeze 1"],
  ["Bot Practice", "Unfreeze Bots", "bot_freeze 0"],

  // ==================== SERVER SETTINGS ====================
  ["Server Settings", "Allow Dropping Knives", "mp_drop_knife_enable 1"],
  ["Server Settings", "Allow Dropping Grenades", "mp_drop_grenade_enable 1"],
  ["Server Settings", "Allow Anyone to Pick Up C4", "mp_anyone_can_pickup_c4 1"],
  ["Server Settings", "Show Map Triggers", "showtriggers_toggle"],
  ["Server Settings", "Clear Smoke and Fire Effects",
    "ent_fire smokegrenade_projectile kill; ent_fire molotov_projectile kill; ent_fire inferno kill"],
  // Knife Commands
  ["Knife Commands", "Enable Knife Dropping", "mp_drop_knife_enable 1"],
  ["Knife Commands", "Spawn Bayonet", "subclass_create 500"],
  ["Knife Commands", "Spawn Classic Knife", "subclass_create 503"],
  ["Knife Commands", "Spawn Flip Knife", "subclass_create 505"],
  ["Knife Commands", "Spawn Gut Knife", "subclass_create 506"],
  ["Knife Commands", "Spawn Karambit", "subclass_create 507"],
  ["Knife Commands", "Spawn M9 Bayonet", "subclass_create 508"],
  ["Knife Commands", "Spawn Huntsman Knife", "subclass_create 509"],
  ["Knife Commands", "Spawn Falchion Knife", "subclass_create 512"],
  ["Knife Commands", "Spawn Bowie Knife", "subclass_create 514"],
  ["Knife Commands", "Spawn Butterfly Knife", "subclass_create 515"],
  ["Knife Commands", "Spawn Shadow Daggers", "subclass_create 516"],
  ["Knife Commands", "Spawn Paracord Knife", "subclass_create 517"],
  ["Knife Commands", "Spawn Survival Knife", "subclass_create 518"],
  ["Knife Commands", "Spawn Ursus Knife", "subclass_create 519"],
  ["Knife Commands", "Spawn Navaja Knife", "subclass_create 520"],
  ["Knife Commands", "Spawn Nomad Knife", "subclass_create 521"],
  ["Knife Commands", "Spawn Stiletto Knife", "subclass_create 522"],
  ["Knife Commands", "Spawn Talon Knife", "subclass_create 523"],
  ["Knife Commands", "Spawn Skeleton Knife", "subclass_create 525"],
  ["Knife Commands", "Spawn Kukri Knife", "subclass_create 526"],

  // Autoexec / Startup Config — FPS and Performance
  ["Autoexec / Startup Config", "Uncap FPS", "fps_max 0"],
  ["Autoexec / Startup Config", "Limit Menu FPS", "fps_max_ui 120"],

  // Autoexec / Startup Config — Mouse
  ["Autoexec / Startup Config", "Set Mouse Sensitivity", "sensitivity 2"],
  ["Autoexec / Startup Config", "Set Zoom Sensitivity", "zoom_sensitivity_ratio 1"],
  ["Autoexec / Startup Config", "Disable Mouse Acceleration", "m_mouseaccel1 0"],
  ["Autoexec / Startup Config", "Disable Mouse Acceleration (Raw)", "m_mouseaccel2 0"],
  ["Autoexec / Startup Config", "Enable Raw Input", "m_rawinput 1"],

  // Autoexec / Startup Config — HUD and Console
  ["Autoexec / Startup Config", "Enable Developer Console", "con_enable 1"],
  ["Autoexec / Startup Config", "Set HUD Scale", "hud_scaling 0.95"],
  ["Autoexec / Startup Config", "Set HUD Color", "cl_hud_color 0"],
  ["Autoexec / Startup Config", "Enable Team Equipment", "cl_teamid_overhead_mode 2"],
  ["Autoexec / Startup Config", "Show Team Equipment and Utility", "+cl_show_team_equipment"],
  ["Autoexec / Startup Config", "Hide Team Equipment and Utility", "-cl_show_team_equipment"],

  // Autoexec / Startup Config — Radar
  ["Autoexec / Startup Config", "Set Radar Scale", "cl_radar_scale 0.4"],
  ["Autoexec / Startup Config", "Set Radar Icon Scale", "cl_radar_icon_scale_min 0.6"],
  ["Autoexec / Startup Config", "Center Radar on Player", "cl_radar_always_centered 1"],
  ["Autoexec / Startup Config", "Radar Rotates", "cl_radar_rotate 1"],
  ["Autoexec / Startup Config", "Show Full Map on Radar", "cl_radar_scale 0.25"],

  // Autoexec / Startup Config — Audio
  ["Autoexec / Startup Config", "Set Master Volume", "volume 1"],
  ["Autoexec / Startup Config", "Set Voice Volume", "voice_modenable 1"],
  ["Autoexec / Startup Config", "Enable Voice Chat", "cl_mute_enemy_team 0"],
  ["Autoexec / Startup Config", "Unmute All Players", "cl_mute_all_but_friends_and_party 0"],

  // Autoexec / Startup Config — Startup and Saving
  ["Autoexec / Startup Config", "Execute Autoexec Config", "exec autoexec.cfg"],
  ["Autoexec / Startup Config", "Save Current Settings", "host_writeconfig"],

  // Steam Launch Options — Startup
  ["Steam Launch Options", "Open Console at Startup", "-console"],
  ["Steam Launch Options", "Execute Autoexec Config", "+exec autoexec.cfg"],
  ["Steam Launch Options", "Start in Fullscreen", "-fullscreen"],
  ["Steam Launch Options", "Start in Windowed Mode", "-windowed"],
  ["Steam Launch Options", "Start Without Sound (Testing)", "-nosound"],
  ["Steam Launch Options", "Start in English", "-language english"],

  // Steam Launch Options — Resolution and Display
  ["Steam Launch Options", "Resolution 1920x1080", "-w 1920 -h 1080"],
  ["Steam Launch Options", "Resolution 1280x960", "-w 1280 -h 960"],
  ["Steam Launch Options", "Resolution 1440x1080", "-w 1440 -h 1080"],
  ["Steam Launch Options", "Resolution 1280x720", "-w 1280 -h 720"],
  ["Steam Launch Options", "Resolution 2560x1440", "-w 2560 -h 1440"],
  ["Steam Launch Options", "Refresh Rate 60Hz", "-refresh 60"],
  ["Steam Launch Options", "Refresh Rate 120Hz", "-refresh 120"],
  ["Steam Launch Options", "Refresh Rate 144Hz", "-refresh 144"],
  ["Steam Launch Options", "Refresh Rate 165Hz", "-refresh 165"],
  ["Steam Launch Options", "Refresh Rate 240Hz", "-refresh 240"],
  ["Steam Launch Options", "Refresh Rate 280Hz", "-refresh 280"],
  ["Steam Launch Options", "Refresh Rate 360Hz", "-refresh 360"],
  ["Steam Launch Options", "Refresh Rate 540Hz", "-refresh 540"],

  // Steam Launch Options — FPS
  ["Steam Launch Options", "Uncap FPS", "+fps_max 0"],
  ["Steam Launch Options", "Limit FPS to 120", "+fps_max 120"],
  ["Steam Launch Options", "Limit FPS to 144", "+fps_max 144"],
  ["Steam Launch Options", "Limit FPS to 240", "+fps_max 240"],
  ["Steam Launch Options", "Limit FPS to 300", "+fps_max 300"],
  ["Steam Launch Options", "Limit FPS to 360", "+fps_max 360"],
  ["Steam Launch Options", "Limit Menu FPS", "+fps_max_ui 120"],

  // Steam Launch Options — Compatibility
  ["Steam Launch Options", "Try Vulkan Renderer", "-vulkan"],
  ["Steam Launch Options", "Allow Third-Party Software", "-allow_third_party_software"],
  ["Steam Launch Options", "Disable Joystick Support", "-nojoy"],
  ["Steam Launch Options", "Request High Process Priority", "-high"],
  ["Steam Launch Options", "Request Low Process Priority", "-low"],

  // Steam Launch Options — Window Position
  ["Steam Launch Options", "Position Window X=100 Y=100", "-x 100 -y 100"],
  ["Steam Launch Options", "Position Window X=0 Y=0", "-x 0 -y 0"],

  // Steam Launch Options — Troubleshooting
  ["Steam Launch Options", "Reset Startup Configuration", "-autoconfig"],
  ["Steam Launch Options", "Disable VAC (Offline / Test Servers Only)", "-insecure"],
  ["Steam Launch Options", "Log Console Output", "-condebug"],
  ["Steam Launch Options", "Start Directly in Console", "-toconsole"]
]

// Each category and command has a type so the UI can filter and save it correctly.
const CATEGORY_TYPES = {
  "Movement": "bind",
  "Weapons": "bind",
  "Grenades": "bind",
  "Buy binds": "bind",
  "Communication": "bind",
  "Gameplay": "bind",
  "Radar": "bind",
  "Demo Review": "bind",
  "HUD": "bind",
  "Crosshair": "bind",
  "Practice Setup": "game",
  "Grenade Practice": "game",
  "Aim Training": "game",
  "Bot Practice": "game",
  "Server Settings": "game",
  "Knife Commands": "game",
  "Autoexec / Startup Config": "game",
  "Steam Launch Options": "steam",
  "Custom": "custom"
}

const CATEGORIES = Object.entries(CATEGORY_TYPES).map(([name, type]) => ({ name, type }))
const COMMANDS_TYPED = COMMANDS.map(([category, label, cmd]) => ({
  category,
  label,
  cmd,
  type: CATEGORY_TYPES[category] || "bind"
}))

const $ = id => document.getElementById(id)

let selectedKey = "A"
let activeCommandType = "bind"
let pendingActions = []
let detected = {}

// =========================
// MAIN KEYBOARD LAYOUT
// =========================

const keyRows = [
  [
    ["ESC", "Esc"],
    ["F1", "F1"], ["F2", "F2"], ["F3", "F3"],
    ["F4", "F4"], ["F5", "F5"], ["F6", "F6"],
    ["F7", "F7"], ["F8", "F8"], ["F9", "F9"],
    ["F10", "F10"], ["F11", "F11"], ["F12", "F12"]
  ],
  [
    ["`", "~<br>`"],
    ["1", "1"], ["2", "2"], ["3", "3"],
    ["4", "4"], ["5", "5"], ["6", "6"],
    ["7", "7"], ["8", "8"], ["9", "9"],
    ["0", "0"], ["-", "-"], ["=", "="],
    ["BACKSPACE", "Back", "w2"]
  ],
  [
    ["TAB", "Tab", "w15"],
    ["Q", "Q"], ["W", "W"], ["E", "E"],
    ["R", "R"], ["T", "T"], ["Y", "Y"],
    ["U", "U"], ["I", "I"], ["O", "O"],
    ["P", "P"], ["[", "["], ["]", "]"],
    ["\\\\", "\\\\", "w15"]
  ],
  [
    ["CAPSLOCK", "Caps", "w2"],
    ["A", "A"], ["S", "S"], ["D", "D"],
    ["F", "F"], ["G", "G"], ["H", "H"],
    ["J", "J"], ["K", "K"], ["L", "L"],
    [";", ";"], ["'", "'"],
    ["ENTER", "Enter", "w2"]
  ],
  [
    ["SHIFT", "Shift", "w25"],
    ["Z", "Z"], ["X", "X"], ["C", "C"],
    ["V", "V"], ["B", "B"], ["N", "N"],
    ["M", "M"], [",", ","], [".", "."],
    ["/", "/"], ["RSHIFT", "Shift", "w25"]
  ],
  [
    ["CTRL", "Ctrl", "w15"],
    ["WIN", "Win"],
    ["ALT", "Alt", "w15"],
    ["SPACE", "Space", "space"],
    ["RALT", "Alt", "w15"],
    ["FN", "Fn"],
    ["RCTRL", "Ctrl", "w15"]
  ]
]

// =========================
// CREATE KEY BUTTON
// =========================

function keyButton(key, label, extra = "") {
  const button = document.createElement("button")

  button.type = "button"
  button.className = `key ${extra}`.trim()
  button.dataset.key = key
  button.setAttribute(
    "aria-label",
    `${label.replace(/<br\s*\/?>/gi, " ")} key`
  )

  button.innerHTML = label

  button.addEventListener("click", () => selectKey(key))

  return button
}

// =========================
// BUILD ALL INPUT DEVICES
// =========================

function buildKeyboard() {
  const keyboard = $("keyboard")
  const numpad = $("numpad")
  const navigation = $("navigation")
  const mouse = $("mouse")

  if (!keyboard || !numpad || !navigation || !mouse) {
    console.error(
      "CS2 Config Builder: missing keyboard, numpad, navigation, or mouse element."
    )
    return
  }

  // =========================
  // MAIN KEYBOARD
  // =========================

  keyboard.replaceChildren()

  keyRows.forEach(row => {
    const line = document.createElement("div")
    line.className = "key-row"

    row.forEach(([key, label, extra = ""]) => {
      line.append(keyButton(key, label, extra))
    })

    keyboard.append(line)
  })

  // =========================
  // NUMPAD
  // =========================

  numpad.replaceChildren()

  numpad.setAttribute("aria-label", "Clickable numeric keypad")

  Object.assign(numpad.style, {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(42px, 1fr))",
    gridTemplateRows: "repeat(5, 46px)",
    gap: "5px",
    maxWidth: "235px"
  })

  function addNumpadKey(key, label, styles = {}) {
    const button = keyButton(key, label)
    Object.assign(button.style, styles)
    numpad.append(button)
    return button
  }
    // Row 1
  addNumpadKey("NUMLOCK", "Num")
  addNumpadKey("KP_SLASH", "/")
  addNumpadKey("KP_MULTIPLY", "*")
  addNumpadKey("KP_MINUS", "−")

  // Row 2
  addNumpadKey("KP_7", "7")
  addNumpadKey("KP_8", "8")
  addNumpadKey("KP_9", "9")

  addNumpadKey("KP_PLUS", "+", {
    gridColumn: "4",
    gridRow: "2 / span 2",
    height: "97px"
  })

  // Row 3
  addNumpadKey("KP_4", "4")
  addNumpadKey("KP_5", "5")
  addNumpadKey("KP_6", "6")

  // Row 4
  addNumpadKey("KP_1", "1")
  addNumpadKey("KP_2", "2")
  addNumpadKey("KP_3", "3")

  addNumpadKey("KP_ENTER", "Enter", {
    gridColumn: "4",
    gridRow: "4 / span 2",
    height: "97px"
  })

  // Row 5
  addNumpadKey("KP_0", "0", {
    gridColumn: "1 / span 2"
  })

  addNumpadKey("KP_DECIMAL", ".")

  // =========================
  // NAVIGATION KEYS
  // =========================

  navigation.replaceChildren()

  navigation.setAttribute(
    "aria-label",
    "Clickable navigation keys"
  )

  Object.assign(navigation.style, {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(48px, 1fr))",
    gridTemplateRows: "repeat(4, 46px)",
    gap: "5px",
    width: "100%",
    maxWidth: "180px"
  })

  function addNavigationKey(key, label, styles = {}) {
    const button = keyButton(key, label)
    Object.assign(button.style, styles)
    navigation.append(button)
    return button
  }

  // Insert, Home, Page Up
  addNavigationKey("INS", "Ins", {
    gridColumn: "1",
    gridRow: "1"
  })

  addNavigationKey("HOME", "Home", {
    gridColumn: "2",
    gridRow: "1"
  })

  addNavigationKey("PGUP", "PgUp", {
    gridColumn: "3",
    gridRow: "1"
  })

  // Delete, End, Page Down
  addNavigationKey("DEL", "Del", {
    gridColumn: "1",
    gridRow: "2"
  })

  addNavigationKey("END", "End", {
    gridColumn: "2",
    gridRow: "2"
  })

  addNavigationKey("PGDN", "PgDn", {
    gridColumn: "3",
    gridRow: "2"
  })

  // Arrow keys
  addNavigationKey("UPARROW", "↑", {
    gridColumn: "2",
    gridRow: "3"
  })

  addNavigationKey("LEFTARROW", "←", {
    gridColumn: "1",
    gridRow: "4"
  })

  addNavigationKey("DOWNARROW", "↓", {
    gridColumn: "2",
    gridRow: "4"
  })

  addNavigationKey("RIGHTARROW", "→", {
    gridColumn: "3",
    gridRow: "4"
  })

  // =========================
  // MOUSE
  // =========================

  mouse.replaceChildren()

  mouse.setAttribute(
    "aria-label",
    "Clickable mouse controls"
  )

  Object.assign(mouse.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap"
  })

  function createContainer(styles = {}) {
    const element = document.createElement("div")
    Object.assign(element.style, styles)
    return element
  }

  // Side buttons
  const sideButtons = createContainer({
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  })

  sideButtons.append(
    keyButton("MOUSE4", "Side 1"),
    keyButton("MOUSE5", "Side 2")
  )

  mouse.append(sideButtons)

  // Mouse body
  const mouseBody = createContainer({
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "126px",
    height: "185px",
    padding: "9px",
    border: "2px solid #657386",
    borderRadius: "48% 48% 36% 36% / 28% 28% 20% 20%",
    background: "linear-gradient(145deg, #394555, #171e29)",
    boxShadow: "inset 0 0 0 4px #242d39",
    overflow: "hidden"
  })

  // Left button
  const leftButton = keyButton("MOUSE1", "Left")

  Object.assign(leftButton.style, {
    height: "70px",
    borderRadius: "90% 12% 8% 8%",
    paddingTop: "20px"
  })

  // Right button
  const rightButton = keyButton("MOUSE2", "Right")

  Object.assign(rightButton.style, {
    height: "70px",
    borderRadius: "12% 90% 8% 8%",
    paddingTop: "20px"
  })

  mouseBody.append(leftButton, rightButton)

  // Scroll wheel click
  const wheelClick = keyButton("MOUSE3", "↕")

  wheelClick.setAttribute("aria-label", "Mouse wheel click")
  wheelClick.title = "Mouse wheel click"

  Object.assign(wheelClick.style, {
    position: "absolute",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "15px",
    minWidth: "15px",
    height: "33px",
    padding: "0",
    borderRadius: "10px",
    background: "#0c121b",
    zIndex: "2"
  })

  mouseBody.append(wheelClick)

  // Center seam
  const seam = createContainer({
    position: "absolute",
    top: "8px",
    bottom: "10px",
    left: "50%",
    borderLeft: "1px solid #657386",
    pointerEvents: "none"
  })

  seam.setAttribute("aria-hidden", "true")

  mouseBody.append(seam)
  mouse.append(mouseBody)

  // Mouse wheel scrolling
  const wheelButtons = createContainer({
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  })

  wheelButtons.append(
    keyButton("MWHEELUP", "Wheel ↑"),
    keyButton("MWHEELDOWN", "Wheel ↓")
  )

  mouse.append(wheelButtons)

  renderKeyStates()
}

// =========================
// SELECT KEY
// =========================

function selectKey(key) {
  // Changing the key should not discard commands already selected.
  selectedKey = selectedKey === key ? "" : key

  $("selectedKey").textContent = selectedKey || "None"

  renderPending()
  renderKeyStates()
}

// =========================
// PARSE CONFIG BINDS
// =========================

function parseBinds(text) {
  const found = {}

  const re =
    /^\s*bind\s+(?:"([^"]+)"|(\S+))\s+(?:"((?:\\.|[^"])*)"|'([^']*)'|(.+?))\s*$/i

  for (const line of text.split(/\r?\n/)) {
    if (/^\s*\/\//.test(line)) continue

    const match = line.match(re)

    if (!match) continue

    const key = (match[1] || match[2] || "")
      .replace(/\\\\/g, "\\")
      .toUpperCase()

    const command = (match[3] ?? match[4] ?? match[5] ?? "")
      .replace(/\\"/g, "\"")
      .trim()

    if (key && command) {
      found[key] = command
    }
  }

  return found
}

// =========================
// DETECT BINDS
// =========================

function refreshDetected() {
  detected = parseBinds($("configText").value)

  $("bindSummary").textContent =
    `${Object.keys(detected).length} detected key bind` +
    `${Object.keys(detected).length === 1 ? "" : "s"}`

  const list = $("detectedBinds")
  list.replaceChildren()

  const keys = Object.keys(detected).sort((a, b) => a.localeCompare(b))

  if (!keys.length) {
    const p = document.createElement("p")

    p.className = "muted"
    p.textContent = "No binds detected yet."

    list.append(p)
  }

  keys.forEach(key => {
    const chip = document.createElement("span")

    chip.className = "detected-chip"
    chip.textContent = `${key} → ${detected[key]}`

    list.append(chip)
  })

  renderKeyStates()
}

// =========================
// UPDATE KEY STYLING
// =========================

function renderKeyStates() {
  document.querySelectorAll("[data-key]").forEach(button => {
    const key = button.dataset.key.toUpperCase()

    button.classList.toggle(
      "selected",
      Boolean(selectedKey) && key === selectedKey.toUpperCase()
    )

    button.classList.toggle(
      "bound",
      Object.prototype.hasOwnProperty.call(detected, key)
    )

    button.title = detected[key] ?
      `${key}: ${detected[key]}` :
      key
  })
}

// =========================
// RENDER COMMANDS
// =========================

function renderCommands() {
  const category = $("category").value
  const query = $("commandSearch").value.trim().toLowerCase()
  const list = $("commandList")
  list.replaceChildren()

  const rows = COMMANDS_TYPED.filter(item => item.type === activeCommandType &&
    (category === "All" || category === item.category) &&
    (!query || `${item.category} ${item.label} ${item.cmd}`.toLowerCase().includes(query))
  )

  let lastGroup = ""

  rows.forEach(item => {
    const { category: group, label, cmd, type } = item

    if (group !== lastGroup) {
      const heading = document.createElement("div")
      heading.className = "command-group"
      heading.textContent = group
      list.append(heading)
      lastGroup = group
    }

    const button = document.createElement("button")
    button.type = "button"
    button.className = "command-option"

    const name = document.createElement("strong")
    name.textContent = label

    const code = document.createElement("code")
    code.textContent = cmd

    button.append(name, code)

    button.addEventListener("click", () => {
      pendingActions.push({ label, cmd, type })
      renderPending()

      document.querySelectorAll(".command-option").forEach(el => {
        el.classList.remove("chosen")
      })

      button.classList.add("chosen")
    })

    list.append(button)
  })

  if (!rows.length) {
    const empty = document.createElement("div")
    empty.className = "empty-list"
    empty.textContent = "No matching commands."
    list.append(empty)
  }
}
// =========================
// RENDER PENDING ACTIONS
// =========================

function renderPending() {
  $("pendingCount").textContent =
    `${pendingActions.length} action` +
    `${pendingActions.length === 1 ? "" : "s"}`

  const list = $("pendingList")
  list.replaceChildren()

  pendingActions.forEach((action, index) => {
    const li = document.createElement("li")

    li.append(
      document.createTextNode(
        `${action.label} — ${action.cmd} `
      )
    )

    const remove = document.createElement("button")

    remove.type = "button"
    remove.textContent = "×"

    remove.setAttribute(
      "aria-label",
      `Remove ${action.label}`
    )

    remove.addEventListener("click", () => {
      pendingActions.splice(index, 1)
      renderPending()
    })

    li.append(remove)
    list.append(li)
  })
}

// =========================
// SAVE BINDS
// =========================

function escapeBind(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "\\\"")
}

function appendLinesToConfig(lines) {
  const editor = $("configText")
  const current = editor.value
  const addition = lines.filter(Boolean).join("\n")

  editor.value = current.trimEnd() ?
    `${current.trimEnd()}\n${addition}\n` :
    `${addition}\n`

  refreshDetected()
  persist()
}

function savePendingBind() {
  if (!pendingActions.length) {
    return showStatus("Choose at least one action first.")
  }

  if (activeCommandType === "bind") {
    const key = selectedKey.trim().toLowerCase()

    if (!key) {
      return showStatus("Select a key before saving a bind.")
    }

    const command = pendingActions
      .map(item => item.cmd)
      .join("; ")

    appendLinesToConfig([
      `bind "${escapeBind(key)}" "${escapeBind(command)}"`
    ])

    pendingActions = []
    selectedKey = ""

    $("selectedKey").textContent = "None"

    renderPending()
    renderKeyStates()

    showStatus(
      `Saved bind for ${key.toUpperCase()} to config. Commands and selected key cleared.`
    )

    return
  }

  // Non-bind commands execute in sequence, so each command gets its own line.
  // Steam launch options are shown as comments in the generated config file.
  const lines = pendingActions.map(item => activeCommandType === "steam" ?
      `// ${item.cmd}` :
      item.cmd
  )

  appendLinesToConfig(lines)

  pendingActions = []
  selectedKey = ""

  $("selectedKey").textContent = "None"

  renderPending()
  renderKeyStates()

  const typeLabel = activeCommandType === "steam" ?
    "Steam EXE launch option(s) as comments" :
    "Game EXE command(s)"

  showStatus(
    `Appended ${typeLabel}. Commands and selected key cleared.`
  )
}

// =========================
// STATUS MESSAGE
// =========================

function showStatus(message) {
  $("saveStatus").textContent = message

  clearTimeout(showStatus.timer)

  showStatus.timer = setTimeout(() => {
    $("saveStatus").textContent = ""
  }, 3500)
}

// =========================
// LOCAL STORAGE
// =========================

function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        text: $("configText").value,
        selectedKey
      })
    )
  } catch (error) {
    // Browser storage may be disabled.
  }
}

// =========================
// DOWNLOAD FILE
// =========================

function downloadFile(filename, content) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  })

  const url = URL.createObjectURL(blob)

  const anchor = document.createElement("a")

  anchor.href = url
  anchor.download = filename

  document.body.append(anchor)

  anchor.click()
  anchor.remove()

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// =========================
// EVENT LISTENERS
// =========================

function updateCategoryOptions() {
  const select = $("category")
  const previous = select.value

  const allowed = CATEGORIES
    .filter(item => item.type === activeCommandType)
    .map(item => item.name)

  select.querySelectorAll("option").forEach(option => {
    if (option.value === "All" || option.value === "Custom") {
      option.hidden =
        option.value === "Custom" && activeCommandType !== "custom"

      option.disabled = option.hidden
      return
    }

    const categoryType = CATEGORY_TYPES[option.value]

    option.hidden = categoryType !== activeCommandType
    option.disabled = option.hidden
  })

  if (previous !== "All" && !allowed.includes(previous)) {
    select.value = "All"
  }

  if (activeCommandType === "custom") {
    select.value = "Custom"
  }
}

document.querySelectorAll("input[name=\"commandType\"]").forEach(radio => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return

    activeCommandType = radio.value

    pendingActions = []

    renderPending()
    updateCategoryOptions()
    renderCommands()
  })
})

$("category").addEventListener("change", renderCommands)
$("commandSearch").addEventListener("input", renderCommands)

$("addCustom").addEventListener("click", () => {
  const cmd = $("customCommand").value.trim()

  if (!cmd) {
    return showStatus("Enter a custom command first.")
  }

  if (activeCommandType === "bind" && !selectedKey) {
    return showStatus("Select a key before adding a custom bind action.")
  }

  pendingActions.push({
    label: "Custom command",
    cmd,
    type: activeCommandType
  })

  $("customCommand").value = ""

  renderPending()
})

$("customCommand").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    $("addCustom").click()
  }
})

$("saveBind").addEventListener("click", savePendingBind)

$("unbindSelected").addEventListener("click", () => {
  if (!selectedKey) {
    return showStatus("Select a key to unbind.")
  }

  const lines = $("configText").value.split(/\r?\n/)
  const key = selectedKey.toLowerCase()

  const kept = lines.filter(line => {
    const match = line.match(
      /^\s*bind\s+(?:"([^"]+)"|(\S+))/i
    )

    return !match ||
      (match[1] || match[2]).toLowerCase() !== key
  })

  $("configText").value = kept.join("\n")

  refreshDetected()
  persist()

  showStatus(`Removed bind lines for ${selectedKey}.`)
})

$("configText").addEventListener("input", () => {
  refreshDetected()
  persist()
})
$("orderConfig").addEventListener("click", () => {
  const lines = $("configText").value.split(/\r?\n/)

  const steamCommands = new Set(
    COMMANDS_TYPED
      .filter(item => item.type === "steam")
      .map(item => item.cmd.trim())
  )

  const gameCommands = new Set(
    COMMANDS_TYPED
      .filter(item => item.type === "game")
      .map(item => item.cmd.trim())
  )

  const sections = {
    steam: [],
    game: [],
    bind: []
  }

  const keyOf = line => {
    const match = line.match(
      /^\s*bind\s+(?:"([^"]+)"|(\S+))/i
    )

    return (match?.[1] || match?.[2] || "").toLowerCase()
  }

  for (const original of lines) {
    const trimmed = original.trim()

    if (!trimmed) continue

    // Regenerate section headings to avoid duplicates.
    if (
      /^\/\/\s*=+/.test(trimmed) ||
      /^\/\/\s*(STEAM EXE|GAME EXE|BINDS)\b/i.test(trimmed)
    ) {
      continue
    }

    // Binds are grouped separately.
    if (/^\s*bind\s+(?:"[^"]+"|\S+)/i.test(trimmed)) {
      sections.bind.push(trimmed)
      continue
    }

    const uncommented = trimmed.replace(/^\/\/\s*/, "")

    // Steam launch options are always output as comments.
    if (
      steamCommands.has(uncommented) ||
      /^-\S/.test(uncommented) ||
      /^\+\S/.test(uncommented)
    ) {
      sections.steam.push(`// ${uncommented}`)
      continue
    }

    // Keep other commands on separate lines in the Game EXE section.
    if (
      gameCommands.has(trimmed) ||
      (!/^\/\//.test(trimmed) && !/^[-+]\S/.test(trimmed))
    ) {
      sections.game.push(trimmed)
      continue
    }

    // Preserve unrelated comments in the Game EXE section.
    sections.game.push(trimmed)
  }

  // Sort binds alphabetically by key.
  sections.bind.sort((a, b) => keyOf(a).localeCompare(keyOf(b))
  )

  const ordered = []

  if (sections.steam.length) {
    ordered.push(
      "// ==================== STEAM EXE ====================",
      ...sections.steam
    )
  }

  if (sections.game.length) {
    ordered.push(
      "// ==================== GAME EXE ====================",
      ...sections.game
    )
  }

  if (sections.bind.length) {
    ordered.push(
      "// ==================== BINDS ====================",
      ...sections.bind
    )
  }

  $("configText").value =
    ordered.join("\n") + (ordered.length ? "\n" : "")

  refreshDetected()
  persist()

  showStatus(
    "Config ordered into Steam EXE, Game EXE, and alphabetized Binds sections."
  )
})

$("downloadConfig").addEventListener("click", () => {
  downloadFile("autoexec.cfg", $("configText").value)
  showStatus("Downloading autoexec.cfg")
})

$("downloadPersonal").addEventListener("click", () => {
  downloadFile("personal.cfg", PERSONAL_CONFIG)
})

$("copyConfig").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("configText").value)

    showStatus("Config copied.")
  } catch {
    const editor = $("configText")

    editor.focus()
    editor.select()

    try {
      document.execCommand("copy")
      showStatus("Config copied where supported.")
    } catch {
      showStatus("Select the text and copy it manually.")
    }
  }
})

$("clearConfig").addEventListener("click", () => {
  if (!confirm(
    "Clear all text from the config editor? " +
    "This cannot be undone unless you have a copy."
  )) {
    return
  }

  $("configText").value = ""

  refreshDetected()
  persist()

  showStatus("Config cleared.")
})

// =========================
// INITIALIZATION
// =========================

buildKeyboard()

try {
  const saved = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "null"
  )

  if (saved && typeof saved.text === "string") {
    $("configText").value = saved.text
  }

  if (saved && typeof saved.selectedKey === "string") {
    selectedKey = saved.selectedKey
  }
} catch (error) {
  // Ignore invalid saved data.
}

$("selectedKey").textContent = selectedKey || "None"

updateCategoryOptions()
renderCommands()
renderPending()
refreshDetected()