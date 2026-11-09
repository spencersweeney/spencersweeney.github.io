(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Nc={x:0,y:0,z:0},Qt={x:0,y:0,z:22},jt={x:0,y:0,z:48},Lt={x:0,z:56,r:8};function Tn(n){return n<22?2*Math.sin(Math.PI*n/22):n<48?2.2*Math.sin(Math.PI*(n-22)/26):0}function ii(n,e){return{x:Tn(n)+e,z:n}}const Ja=ii(9.4,.85),Qa=ii(12.7,-.9),ja=ii(17.3,.7),eo=ii(25.2,-.85),to=ii(27.8,.75),no=ii(33.2,-1.05),io=ii(38.4,1),so=[{id:"gorse1",kind:"gorse",x:Ja.x,z:Ja.z},{id:"gorse2",kind:"gorse",x:Qa.x,z:Qa.z},{id:"gorse3",kind:"gorse",x:ja.x,z:ja.z},{id:"gorse4",kind:"gorse",x:eo.x,z:eo.z},{id:"gorse5",kind:"gorse",x:to.x,z:to.z},{id:"wisp1",kind:"wisp",x:no.x,z:no.z},{id:"wisp2",kind:"wisp",x:io.x,z:io.z},{id:"gatewick",kind:"gatewick",x:0,z:56}],Cl=[{x:5.4,z:58.2,r:.55},{x:-5.4,z:58.2,r:.55},{x:4.6,z:61.4,r:.5},{x:-4.6,z:61.4,r:.5},{x:3.6,z:53.6,r:.48},{x:-3.6,z:53.6,r:.48}],Uc={spawn:0,trail_shrine:1,gate_threshold:2,cleared:3};function ai(n){return Uc[n]}function ro(n){return n==="trail_shrine"?{...Qt}:n==="gate_threshold"||n==="cleared"?{...jt}:{...Nc}}const Ma={master:!0,damageAssist:!0,extraIframes:!0,softLock:!0,cameraRecenter:!0,showPrompts:!0,slowCombat:!1,telegraphStyle:"amber"};function ao(n){const e=n.master;return{damageTakenMult:e&&n.damageAssist?.5:1,dodgeIframesMs:e&&n.extraIframes?300:220,telegraphBonusMs:e?150:0,softLock:e&&n.softLock,cameraRecenter:e&&n.cameraRecenter,showPrompts:e&&n.showPrompts,slowCombat:e&&n.slowCombat,telegraphStyle:n.telegraphStyle}}const Fc={gorse:400,wisp:450,gatewickSweep:500,gatewickSlam:550};function Oc(n,e){const t=e?150:0,i=e?500:350;return Math.max(Fc[n]+t,i)}const ue={title:"Lampkeep of the Green Spire",subtitle:"A short lamp-lit climb",begin:"Begin",continue:"Continue",controls:"Controls",settings:"Settings",about:"About",story:"Story Summary",assistsBanner:"Assists are ON by default — fair telegraphs, half damage, longer dodges. Change anytime in Settings.",assistsOffNote:"Assists are currently off for this save.",controlsCard:["Move: WASD / Stick","Look: Mouse / Right stick / Drag","Attack: Click / J / South","Dodge: Space / K / East","Lamp Flare: F / West","Lock-On: Q","Touch: left stick, right buttons, drag to look"],promptGorse:"Defeat the Gorse-sprites. Watch for the red circle — then dodge.",promptShrine:"Checkpoint lit. Rest here to heal.",promptWisp:"Wisps hate Lamp Flare (F).",promptGate:"Gatewick guards the Spire. Use the shrine before you enter.",bossIntro:"Gatewick stirs — a wick that would rather stay dark.",bossClear:"The gate lamp catches. Mist thins toward the foyer.",ending:"You reached the Spire gate. The rest of the mountain can wait. Thank you for playing this slice.",endingTitle:"Title",endingAbout:"About",endingStory:"Story Summary",death:"The mist takes a turn.",retry:"Retry checkpoint",deathTitle:"Title",aboutLines:["Lampkeep of the Green Spire is a short adventure on Spencer Sweeney's site.","The Spire, its lamps, and its travelers are fiction.","The older space page remains at the site root.","(No contact link in this build.)"],storyBody:"A new Lampkeep walks the Mist Road, fights restless shades, and rekindles the Spire gate so dawn can find the tower again.",settingsLabels:{master:"Assists master",damage:"Damage assist",dodge:"Dodge i-frames",softLock:"Soft lock",recenter:"Camera recenter",telegraph:"Telegraph style",wobble:"Texture wobble",reduced:"Reduced motion",fov:"FOV",remap:"Remap keys",reset:"Reset progress",back:"Back",slow:"Slow combat",prompts:"Show button prompts"},telegraphStyles:{amber:"Amber",high:"High contrast",colorblind:"Colorblind (blue / orange)"},reducedModes:{auto:"Auto (follow system)",on:"On",off:"Off"},noSave:"No save yet.",padLost:"Gamepad disconnected.",loading:"Loading…",rotate:"Rotate for touch controls",resume:"Resume",back:"Back",pressKey:"Press a key…",oil:"Oil",hp:"HP",lockOn:"Lock-On",pause:"Pause",move:"Move",attack:"Attack",dodge:"Dodge",lamp:"Lamp",webglError:"3D couldn't start in this browser. About and the story summary still open.",bossName:"Gatewick",slowHint:"Hold Alt while enabled",fovValue:n=>`FOV ${n}`};function oo(n){return n==="gorse"?2:n==="wisp"?3:12}function Bc(n){return n==="gorse"?.55:n==="wisp"?.5:1.25}function zc(n){return n==="wisp"?1.25:n==="gatewick"?1.35:.6}function os(n,e,t,i,s=!1){const r=n.charCodeAt(n.length-1)%2===0?1:-1;return{id:n,kind:e,x:t,y:e==="wisp"?1.15:0,z:i,yaw:Math.PI,hp:oo(e),maxHp:oo(e),alive:!0,homeX:t,homeZ:i,summon:s,state:"idle",windTotal:0,windLeft:0,recoverLeft:0,stunLeft:0,attackCd:.35,ring:0,sweeps:0,telegraphShape:"none",telegraphR:0,telegraphCone:0,telegraphLen:0,aimX:0,aimZ:1,markX:t,markZ:i,hop:0,strafe:r,strafeT:0,pendingSummon:!1}}function Xi(n,e){return Oc(n,e>0)/1e3}function Ai(n,e,t){const i=e-n.x,s=t-n.z,r=Math.hypot(i,s)||1;n.aimX=i/r,n.aimZ=s/r,n.yaw=Math.atan2(i,s)}function lo(n,e){!n.alive||e<=0||(n.hp=Math.max(0,n.hp-e),n.hp<=0&&(n.alive=!1,n.telegraphShape="none",n.state="idle",n.windLeft=0))}function kc(n,e){!n.alive||e<=0||(n.stunLeft=Math.max(n.stunLeft,e),n.state="stun",n.telegraphShape="none",n.windLeft=0,n.ring=0)}function Pl(n){return n<=6?2:1}function nn(n,e,t){return Math.max(e,Math.min(t,n))}function oi(n,e,t){return n+(e-n)*t}function Ll(n){const e=Math.PI*2;let t=(n+Math.PI)%e;return t<0&&(t+=e),t-Math.PI}function Ps(n,e,t,i){return n+Ll(e-n)*(1-Math.exp(-t*i))}function Gc(n,e,t,i,s,r,a,o,c){const l=a-i,h=o-s,m=c-r,u=n-i,p=e-s,_=t-r,E=l*l+h*h+m*m,f=E>1e-8?nn((u*l+p*h+_*m)/E,0,1):0,d=i+l*f-n,v=s+h*f-e,b=r+m*f-t;return Math.hypot(d,v,b)}function Hc(n,e,t,i,s,r,a,o,c,l,h){return Gc(o,c,l,n,e,t,i,s,r)<=a+h}function Bs(n,e,t,i,s){const r=n-t,a=e-i;return r*r+a*a<=s*s+1e-6}function zs(n,e,t,i,s,r,a,o){const c=s-n,l=r-e,h=Math.hypot(c,l);if(h>a)return!1;if(h<1e-4)return!0;const m=Math.hypot(t,i)||1,u=c/h*(t/m)+l/h*(i/m),p=o*Math.PI/180*.5;return Math.acos(nn(u,-1,1))<=p+1e-4}const co=.8;function Vc(n,e,t){if(n.alive){if(n.hop+=e.dt,Ai(n,e.px,e.pz),!t){n.state="idle",n.telegraphShape="none";return}if(n.stunLeft>0){n.stunLeft-=e.dt,n.state="stun",n.telegraphShape="none";return}if(!(n.recoverLeft>0&&(n.recoverLeft-=e.dt,n.state="recover",n.telegraphShape="none",ho(n,e),n.recoverLeft>0))){if(n.state==="telegraph"){n.windLeft-=e.dt,n.windLeft<=0&&Xc(n,e);return}if(ho(n,e),n.attackCd>0){n.attackCd-=e.dt;return}Wc(n,e)}}}function ho(n,e){const t=e.px-n.x,i=e.pz-n.z,s=Math.hypot(t,i)||1;let r=0;s>3.15?r=1.65:s<2.2&&(r=-1.15),n.x+=t/s*r*e.dt,n.z+=i/s*r*e.dt;const a=n.x,o=n.z-56,c=Math.hypot(a,o);c>6.4&&(n.x=a/c*6.4,n.z=56+o/c*6.4)}function Wc(n,e){n.state="telegraph",n.pendingSummon=!1,Pl(n.hp)===1?(n.ring=0,n.windTotal=Xi("gatewickSweep",e.bonusMs),n.windLeft=n.windTotal,n.telegraphShape="cone",n.telegraphCone=90,n.telegraphLen=3.5,n.markX=n.x,n.markZ=n.z,Ai(n,e.px,e.pz),n.sweeps+=1,n.sweeps%2===0&&(n.pendingSummon=!0)):(n.ring=1,n.windTotal=Xi("gatewickSlam",e.bonusMs),n.windLeft=n.windTotal,n.telegraphShape="circle",n.telegraphR=2,n.markX=n.x,n.markZ=n.z)}function Xc(n,e){if(n.telegraphShape==="cone"){zs(n.x,n.z,n.aimX,n.aimZ,e.px,e.pz,n.telegraphLen,n.telegraphCone)&&e.hurtPlayer(1,n.x,n.z),n.state="idle",n.telegraphShape="none",n.recoverLeft=co;return}if(n.ring===1){Bs(e.px,e.pz,n.x,n.z,2)&&e.hurtPlayer(1,n.x,n.z),n.ring=2,n.windTotal=Xi("gatewickSlam",e.bonusMs),n.windLeft=n.windTotal,n.telegraphShape="circle",n.telegraphR=3.2,n.markX=n.x,n.markZ=n.z,n.state="telegraph";return}Bs(e.px,e.pz,n.x,n.z,n.telegraphR)&&e.hurtPlayer(1,n.x,n.z),n.ring=0,n.state="idle",n.telegraphShape="none",n.recoverLeft=co}const qc=8,uo=1.1,fo=2.55,Yc=.5;function $c(n,e){if(!n.alive)return;if(n.hop+=e.dt*7,n.stunLeft>0){n.stunLeft-=e.dt,n.state="stun",n.telegraphShape="none";return}if(n.recoverLeft>0&&(n.recoverLeft-=e.dt,n.state="recover",n.telegraphShape="none",n.recoverLeft>0))return;if(n.state==="telegraph"){const r=n.markX-n.x,a=n.markZ-n.z,o=Math.hypot(r,a);o>.15&&(n.x+=r/o*3.4*e.dt,n.z+=a/o*3.4*e.dt),Ai(n,n.markX,n.markZ),n.windLeft-=e.dt,n.windLeft<=0&&(Bs(e.px,e.pz,n.markX,n.markZ,uo)&&e.hurtPlayer(1,n.markX,n.markZ),n.state="idle",n.telegraphShape="none",n.recoverLeft=Yc);return}const t=e.px-n.x,i=e.pz-n.z,s=Math.hypot(t,i);s<qc?(Ai(n,e.px,e.pz),s>1.15&&(n.x+=t/s*fo*e.dt,n.z+=i/s*fo*e.dt),n.attackCd>0&&(n.attackCd-=e.dt),s<=1.85&&n.attackCd<=0&&(n.state="telegraph",n.windTotal=Xi("gorse",e.bonusMs),n.windLeft=n.windTotal,n.telegraphShape="circle",n.telegraphR=uo,n.markX=e.px,n.markZ=e.pz,n.attackCd=.2)):n.attackCd>0&&(n.attackCd-=e.dt)}const po=2.65,Kc=.55;function Zc(n,e){if(!n.alive)return;if(n.hop+=e.dt*3,n.stunLeft>0){n.stunLeft-=e.dt,n.state="stun",n.telegraphShape="none",n.y=1.15+Math.sin(n.hop)*.08;return}if(n.recoverLeft>0&&(n.recoverLeft-=e.dt,n.state="recover",n.telegraphShape="none",n.y=1.15+Math.sin(n.hop)*.12,n.recoverLeft>0))return;const t=e.px-n.x,i=e.pz-n.z,s=Math.hypot(t,i)||1;if(n.state==="telegraph"){n.windLeft-=e.dt,n.windLeft<=0&&(zs(n.x,n.z,n.aimX,n.aimZ,e.px,e.pz,n.telegraphLen,n.telegraphCone)&&e.hurtPlayer(1,n.x,n.z),n.state="idle",n.telegraphShape="none",n.recoverLeft=Kc),n.y=1.15+Math.sin(n.hop)*.12;return}if(s<12){Ai(n,e.px,e.pz);let r=0,a=0;s<5?(r=-t/s,a=-i/s):s>7?(r=t/s,a=i/s):(n.strafeT+=e.dt,n.strafeT>1.6&&(n.strafe=-n.strafe,n.strafeT=0),r=-i/s*n.strafe,a=t/s*n.strafe),n.x+=r*po*e.dt,n.z+=a*po*e.dt,n.attackCd>0&&(n.attackCd-=e.dt),s<8.5&&s>2.2&&n.attackCd<=0&&(n.state="telegraph",n.windTotal=Xi("wisp",e.bonusMs),n.windLeft=n.windTotal,n.telegraphShape="cone",n.telegraphCone=60,n.telegraphLen=5,n.attackCd=.15,Ai(n,e.px,e.pz))}n.y=1.15+Math.sin(n.hop)*.18}const Jc=.08,mo=.1,Qc=.18,jc=.05,eh=.28,th=.18,go=9,nh=.4,ih=.6,_o=3,xo=4.2,sh=20,rh=.35,vo=.6,So=1.2,ah=.45;function oh(n){return n.phase!=="idle"?!1:(n.phase="windup",n.t=0,n.hitIds=[],!0)}function lh(n,e,t){if(n.phase==="idle"||e<=0)return!1;let i=e,s=!1;for(;i>1e-8&&n.phase!=="idle";)if(n.phase==="windup"){const r=Jc-n.t;if(i+1e-8<r){n.t+=i;break}i-=r,n.phase="active",n.t=0}else if(n.phase==="active"){const r=mo-n.t,a=Math.min(i,Math.max(r,0));n.t+=a,i-=a;for(const o of t)n.hitIds.includes(o.id)||(n.hitIds.push(o.id),o.hit(),s=!0);n.t>=mo-1e-8&&(n.phase="recovery",n.t=0)}else{const r=Qc-n.t;if(i+1e-8<r){n.t+=i;break}i-=r,n.phase="idle",n.t=0,n.hitIds=[]}return s}function ch(n,e,t,i){if(n.dodgeCd>0||n.dodging||!n.alive)return!1;const s=Math.hypot(e,t)||1;return n.dodging=!0,n.dodgeT=0,n.dodgeDx=e/s,n.dodgeDz=t/s,n.iframes=i,n.dodgeCd=nh,n.attack.phase="idle",n.attack.t=0,n.attack.hitIds=[],!0}function hh(n,e){n.iframes>0&&(n.iframes=Math.max(0,n.iframes-e)),n.dodgeCd>0&&(n.dodgeCd=Math.max(0,n.dodgeCd-e)),n.dodging&&(n.dodgeT+=e,n.dodgeT>=eh&&(n.dodging=!1))}function uh(n,e,t,i,s){if(n.iframes>0||n.hurtT>0||!n.alive)return!1;n.hp=Math.max(0,n.hp-e*s),n.hurtT=ih;const r=n.x-t,a=n.z-i,o=Math.hypot(r,a)||1;return n.kbx=r/o*_o,n.kbz=a/o*_o,n.kbT=.2,n.hp<=0&&(n.hp=0,n.alive=!1),!0}const Pr=100,Mo=25,dh=.2,fh=5,ph=4,mh=50;function gh(n){return n+1e-6<Mo?null:nn(n-Mo,0,Pr)}function _h(n,e,t){return e<=0?nn(n,0,Pr):nn(n+fh*e,0,Pr)}function xh(n,e){return n==="wisp"?{damage:1,stun:1.2}:n==="gorse"?{damage:1,stun:0}:n==="gatewick"&&e>6?{damage:1,stun:0}:null}function vh(n,e){return 0}function Dl(n,e){if(e<-1.2||e>66)return!1;const t=nn(e,0,64),i=Tn(t);if(Math.abs(n-i)<=2.2&&e<=64.2)return!0;const s=n-Lt.x,r=e-Lt.z;return s*s+r*r<=8.35*8.35&&e>=46.5}function Sh(n,e){const t=nn(e,-1,64),i=Tn(nn(t,0,64)),s=2.05;let r=nn(n,i-s,i+s),a=nn(e,-1,64.2);if(Dl(r,a))return{x:r,z:a};const o=n-Lt.x,c=e-Lt.z,l=Math.hypot(o,c)||1,h=8.05;if(e>45){const m=Math.min(1,h/l);return{x:Lt.x+o*m,z:Lt.z+c*m}}return{x:i,z:a}}function yo(n,e,t=rh,i=!1){let s=n,r=e;for(let a=0;a<3;a++){if(!Dl(s,r)){const o=Sh(s,r);s=o.x,r=o.z}for(const o of Cl){const c=s-o.x,l=r-o.z,h=Math.hypot(c,l),m=o.r+t*.5;if(h<m){const u=m/(h||1);s=o.x+c*u,r=o.z+l*u}}if(i){const o=s-Lt.x,c=r-Lt.z,l=Math.hypot(o,c),h=Lt.r-.35;l>h&&(s=Lt.x+o/l*h,r=Lt.z+c/l*h)}}return{x:s,z:r}}function Mh(n,e,t,i){const s=vh();return n<=s?{y:s,vy:0,grounded:!0}:n-s<=.1&&e<=0?{y:s,vy:0,grounded:!0}:n-s<=vo&&e<=0&&n-s<vo?{y:n,vy:e,grounded:!1}:{y:n,vy:e,grounded:!1}}function yh(n,e,t){const i=e-sh*t;return{y:n+i*t,vy:i}}const Hi={moveX:0,moveY:0,lookX:0,lookY:0,attack:!1,dodge:!1,flare:!1,lockOn:!1,interact:!1,slow:!1},Eh=-10*Math.PI/180,bh=55*Math.PI/180,Il=3;function Qs(n,e){return{x:n,y:0,z:e,yaw:0,vy:0,hp:Il,oil:100,grounded:!0,attack:{phase:"idle",t:0,hitIds:[]},dodging:!1,dodgeT:0,dodgeDx:0,dodgeDz:1,dodgeCd:0,iframes:0,hurtT:0,kbx:0,kbz:0,kbT:0,flaring:!1,flareT:0,flareHitIds:[],alive:!0,moving:!1}}class Th{player;enemies;assists;checkpoint="spawn";cameraYaw=0;cameraPitch=.22;lookIdle=0;lockId=null;outcome="play";time=0;hitstop=0;prompt="";promptT=0;bossFight=!1;bossIntro=!1;visitedTrail=!1;visitedGate=!1;hitsTaken=0;debugFreezeAI=!1;shown={gorse:!1,shrine:!1,wisp:!1,gate:!1};summonN=0;constructor(e){this.assists=ao(e),this.player=Qs(0,0),this.enemies=so.map(t=>os(t.id,t.kind,t.x,t.z))}setAssists(e){this.assists=ao(e)}reset(){this.checkpoint="spawn",this.player=Qs(0,0),this.enemies=so.map(e=>os(e.id,e.kind,e.x,e.z)),this.cameraYaw=0,this.cameraPitch=.22,this.lookIdle=0,this.lockId=null,this.outcome="play",this.time=0,this.hitstop=0,this.prompt="",this.promptT=0,this.bossFight=!1,this.bossIntro=!1,this.visitedTrail=!1,this.visitedGate=!1,this.hitsTaken=0,this.shown={gorse:!1,shrine:!1,wisp:!1,gate:!1},this.summonN=0}loadCheckpoint(e){if(this.reset(),e==="spawn")return;this.checkpoint=e;const t=ro(e);this.player.x=t.x,this.player.z=t.z,this.player.yaw=0,ai(e)>=ai("trail_shrine")&&(this.visitedTrail=!0),ai(e)>=ai("gate_threshold")&&(this.visitedGate=!0),e==="cleared"&&(this.outcome="clear")}respawn(){const e=ro(this.checkpoint==="cleared"?"gate_threshold":this.checkpoint);this.player=Qs(e.x,e.z),this.outcome="play",this.hitstop=0,this.bossFight=!1,this.lockId=null,this.prompt="",this.promptT=0;const t=e.z-.4;this.enemies=this.enemies.filter(i=>!i.summon);for(const i of this.enemies){if(!(i.kind==="gatewick"||i.homeZ>=t))continue;const r=os(i.id,i.kind,i.homeX,i.homeZ,!1);Object.assign(i,r)}}tryHurt(e,t,i){const s=uh(this.player,e,t,i,this.assists.damageTakenMult);return s&&(this.hitsTaken+=1),s}shapeThreatens(e,t,i){return!e.alive||e.telegraphShape==="none"?!1:e.telegraphShape==="circle"?Bs(t,i,e.markX,e.markZ,e.telegraphR):zs(e.x,e.z,e.aimX,e.aimZ,t,i,e.telegraphLen,e.telegraphCone)}nearestThreat(e){let t=null,i=1/0;for(const s of this.enemies){if(!s.alive)continue;const r=Math.hypot(s.x-this.player.x,s.z-this.player.z),a=s.kind==="gatewick"?this.bossFight?16:0:e;r<=a&&r<i&&(t=s,i=r)}return t}nextShrine(){return this.visitedTrail?this.visitedGate?null:{x:jt.x,z:jt.z}:{x:Qt.x,z:Qt.z}}step(e,t=Hi){if(this.stepDt=e,this.outcome!=="play")return;if(this.hitstop>0){this.hitstop=Math.max(0,this.hitstop-e);return}this.time+=e;const i=this.player;i.hurtT>0&&(i.hurtT=Math.max(0,i.hurtT-e)),this.applyLook(e,t),this.applyActions(t),this.applyMotion(e,t),this.applySoftLock();const s=this.applySwing(e),r=this.applyFlare(e,t);if((s||r)&&this.hitstop<=0&&(this.hitstop=jc),this.bossDead()){this.outcome="clear",this.checkpoint="cleared",this.say(ue.bossClear,6);return}if(this.debugFreezeAI||this.stepEnemies(t.slow&&this.assists.slowCombat?e*.75:e),!i.alive){this.outcome="dead";return}this.refreshPrompts()}applyLook(e,t){if(t.aimYaw!==void 0&&Number.isFinite(t.aimYaw)){this.cameraYaw=t.aimYaw,this.player.yaw=t.aimYaw,this.lookIdle=0;return}if(this.cameraYaw-=t.lookX,this.cameraPitch=nn(this.cameraPitch+t.lookY,Eh,bh),Math.abs(t.lookX)+Math.abs(t.lookY)>1e-5?this.lookIdle=0:this.lookIdle+=e,t.lockOn)if(this.lockId)this.lockId=null;else{const r=this.nearestThreat(14);this.lockId=r?r.id:null}const s=this.enemies.find(r=>r.id===this.lockId&&r.alive);if(this.lockId&&(!s||Math.hypot(s.x-this.player.x,s.z-this.player.z)>14)&&(this.lockId=null),s){const r=Math.atan2(s.x-this.player.x,s.z-this.player.z);this.cameraYaw=Ps(this.cameraYaw,r,10,e),this.lookIdle=0;return}this.assists.cameraRecenter&&this.lookIdle>1.2&&this.player.moving&&(this.cameraYaw=Ps(this.cameraYaw,this.player.yaw,4,e))}applyActions(e){const t=this.player,i=this.wishDir(e);if(e.dodge){const s=i.moving?i.x:Math.sin(t.yaw),r=i.moving?i.z:Math.cos(t.yaw);ch(t,s,r,this.assists.dodgeIframesMs/1e3)}if(e.attack&&!t.dodging&&oh(t.attack),e.interact&&this.interact(),e.flare&&!t.flaring){const s=gh(t.oil);s!==null&&(t.oil=s,t.flaring=!0,t.flareT=0,t.flareHitIds=[])}}wishDir(e){let t=e.moveX,i=e.moveY;const s=Math.hypot(t,i);s>1&&(t/=s,i/=s);const r=e.moveYaw!==void 0?e.moveYaw:this.cameraYaw,a=Math.sin(r),o=Math.cos(r),c=Math.cos(r),l=-Math.sin(r),h=c*t+a*i,m=l*t+o*i;return{x:h,z:m,moving:s>.12}}applyMotion(e,t){const i=this.player;hh(i,e);const s=this.wishDir(t);let r=0,a=0;i.dodging&&i.dodgeT<=th?(r=i.dodgeDx*go,a=i.dodgeDz*go,i.moving=!0):s.moving&&!i.dodging?(r=s.x*xo,a=s.z*xo,i.moving=!0,i.yaw=Ps(i.yaw,Math.atan2(s.x,s.z),14,e)):(i.moving=!1,t.moveYaw!==void 0&&!i.dodging&&(i.yaw=t.moveYaw)),i.kbT>0&&(r+=i.kbx,a+=i.kbz,i.kbT=Math.max(0,i.kbT-e)),i.x+=r*e,i.z+=a*e;const o=yo(i.x,i.z,.35,this.bossFight&&!this.bossDead());i.x=o.x,i.z=o.z;const c=yh(i.y,i.vy,e),l=Mh(c.y,c.vy,i.x,i.z);i.y=l.y,i.vy=l.vy,i.grounded=l.grounded}applySoftLock(){const e=this.player;if(!this.assists.softLock||e.attack.phase!=="windup"&&e.attack.phase!=="active")return;const t=this.nearestThreat(3.6);if(!t)return;const i=Math.atan2(t.x-e.x,t.z-e.z),s=Ll(i-e.yaw);Math.abs(s)<.75&&(e.yaw+=s*.55)}stepDt=1/60;applySwing(e){const t=this.player,i=Math.sin(t.yaw),s=Math.cos(t.yaw),r=t.x+i*.35,a=t.z+s*.35,o=r+i*So,c=a+s*So,l=[];for(const h of this.enemies)!h.alive||!Hc(r,.95,a,o,.95,c,ah,h.x,zc(h.kind),h.z,Bc(h.kind))||l.push({id:h.id,hit:()=>lo(h,1)});return lh(t.attack,e,l)}applyFlare(e,t){const i=this.player;if(!i.flaring)return i.oil=_h(i.oil,e),!1;i.flareT+=e;const s=Math.sin(i.yaw),r=Math.cos(i.yaw);let a=!1;for(const o of this.enemies){if(!o.alive||i.flareHitIds.includes(o.id)||!zs(i.x,i.z,s,r,o.x,o.z,ph,mh))continue;const c=xh(o.kind,o.hp);i.flareHitIds.push(o.id),c&&(lo(o,c.damage),c.stun>0&&kc(o,c.stun),a=!0)}return i.flareT>=dh&&(i.flaring=!1),a}stepEnemies(e){const t={dt:e,px:this.player.x,pz:this.player.z,bonusMs:this.assists.telegraphBonusMs,hurtPlayer:(i,s,r)=>this.tryHurt(i,s,r)};for(const i of this.enemies){if(!i.alive)continue;i.kind==="gorse"?$c(i,t):i.kind==="wisp"?Zc(i,t):Vc(i,t,this.bossFight),i.pendingSummon&&(i.pendingSummon=!1,this.spawnSummon(i));const s=i.kind==="gatewick"||i.summon,r=yo(i.x,i.z,.3,s&&this.bossFight);i.x=r.x,i.z=r.z}this.separate()}spawnSummon(e){if(this.enemies.some(i=>i.summon&&i.alive)||Pl(e.hp)===2)return;this.summonN+=1;const t=os(`summon${this.summonN}`,"gorse",e.x+1.4,e.z-1.2,!0);t.homeX=t.x,t.homeZ=t.z,this.enemies.push(t)}separate(){const e=this.enemies.filter(t=>t.alive);for(let t=0;t<e.length;t++)for(let i=t+1;i<e.length;i++){const s=e[t],r=e[i],a=r.x-s.x,o=r.z-s.z,c=Math.hypot(a,o),l=s.kind==="gatewick"||r.kind==="gatewick"?1.6:.85;if(c>=l||c<1e-4)continue;const h=(l-c)*.5,m=a/c,u=o/c;s.kind!=="gatewick"&&(s.x-=m*h,s.z-=u*h),r.kind!=="gatewick"&&(r.x+=m*h,r.z+=u*h)}}bossDead(){const e=this.enemies.find(t=>t.kind==="gatewick");return!e||!e.alive}interact(){const e=this.player;Math.hypot(e.x-Qt.x,e.z-Qt.z)<=1.5&&this.rest("trail_shrine"),Math.hypot(e.x-jt.x,e.z-jt.z)<=1.5&&this.rest("gate_threshold")}rest(e){this.player.hp=Il,e==="trail_shrine"&&(this.visitedTrail=!0),e==="gate_threshold"&&(this.visitedTrail=!0,this.visitedGate=!0),ai(e)>ai(this.checkpoint)&&(this.checkpoint=e),this.say(ue.promptShrine,3.2)}refreshPrompts(){this.promptT>0&&(this.promptT=Math.max(0,this.promptT-this.stepDt));const e=this.player;!this.bossFight&&!this.bossDead()&&e.z>50.5&&Math.hypot(e.x-Lt.x,e.z-Lt.z)<7.2&&(this.bossFight=!0,this.bossIntro=!0,this.say(ue.bossIntro,4.5)),this.assists.showPrompts&&(!this.shown.gorse&&e.z>3&&(this.shown.gorse=!0,this.say(ue.promptGorse,4.5)),!this.shown.shrine&&Math.hypot(e.x-Qt.x,e.z-Qt.z)<3.2&&(this.shown.shrine=!0,this.say(ue.promptShrine,4.2)),!this.shown.wisp&&this.enemies.some(t=>t.kind==="wisp"&&t.alive&&Math.hypot(t.x-e.x,t.z-e.z)<8)&&(this.shown.wisp=!0,this.say(ue.promptWisp,4.2)),!this.shown.gate&&Math.hypot(e.x-jt.x,e.z-jt.z)<6&&e.z>40&&(this.shown.gate=!0,this.say(ue.promptGate,4.5)))}say(e,t){this.prompt=e,this.promptT=t}}function li(n,e={}){return{...Hi,moveX:0,moveY:1,moveYaw:n,...e}}function Eo(n){const e=n.player;if(!e.alive||n.outcome!=="play")return{...Hi};const t=n.enemies.filter(u=>u.alive&&u.windLeft>0&&u.windLeft<.22&&n.shapeThreatens(u,e.x,e.z));if(t.length&&e.iframes<=0&&!e.dodging){const u=t[0],p=e.x-u.markX,_=e.z-u.markZ,E=Math.hypot(p,_)>.2?Math.atan2(p,_):u.yaw+Math.PI/2,f=u.telegraphShape==="cone"?Math.atan2(u.aimX,u.aimZ)+Math.PI/2:E;return e.dodgeCd<=0?li(f,{dodge:!0}):li(f)}const i=n.nextShrine(),s=n.nearestThreat(8.5);if(i&&(!s||i.z<s.homeZ-1.2)){const u=i.x-e.x,p=i.z-e.z,_=Math.hypot(u,p),E=Math.atan2(u,p);if(_<1.35)return{...Hi,moveYaw:E,interact:!0};if(i.z>=e.z-2.5)return li(E)}if(!s){const u=Math.min(54,e.z+5),p=Tn(Math.max(0,Math.min(48,u)));return li(Math.atan2(p-e.x,u-e.z))}const r=s.x-e.x,a=s.z-e.z,o=Math.hypot(r,a)||1e-4,c=Math.atan2(r,a),l=s.kind==="gatewick"?2.35:s.kind==="wisp"?1.35:1.3,h=s.kind==="wisp"&&s.stunLeft<=0&&!e.flaring&&e.oil>=25&&o<4.15&&o>.7;if(o>l+.18)return li(c,{flare:h});if(s.kind==="gatewick"&&o<l-.4)return li(c+Math.PI);const m=e.attack.phase==="idle"&&!e.dodging;return{...Hi,moveYaw:c,attack:m,flare:h}}const Nl={up:["KeyW"],down:["KeyS"],left:["KeyA"],right:["KeyD"],attack:["mouse0","KeyJ"],dodge:["Space","KeyK","ShiftLeft"],flare:["KeyF","KeyL"],lockOn:["KeyQ","mouse2"],interact:["KeyE"],pause:["Escape"]},wh=[{action:"up",label:"Move forward"},{action:"down",label:"Move back"},{action:"left",label:"Move left"},{action:"right",label:"Move right"},{action:"attack",label:"Attack"},{action:"dodge",label:"Dodge"},{action:"flare",label:"Lamp Flare"},{action:"lockOn",label:"Lock-On"},{action:"interact",label:"Interact"},{action:"pause",label:"Pause"}];function Ah(n){return n==="mouse0"?"Click":n==="mouse1"?"Middle click":n==="mouse2"?"Right click":n==="Space"?"Space":n==="Escape"?"Esc":n==="ShiftLeft"||n==="ShiftRight"?"Shift":n.startsWith("Key")?n.slice(3):n.startsWith("Digit")?n.slice(5):n}function On(n){return n.map(([e,t,i])=>`<button type="button" id="${e}" ${i?"disabled":""}>${t}</button>`).join("")}function Rh(n){return n.screen==="play"?"":n.screen==="title"?Bn(`
      <h1>${ue.title}</h1>
      <p class="sub">${ue.subtitle}</p>
      <p class="banner" role="note">${ue.assistsBanner}</p>
      ${n.assistsOn?"":`<p class="note">${ue.assistsOffNote}</p>`}
      <div class="stack">
        ${On([["begin",ue.begin],["continue",ue.continue,!n.canContinue],["controls",ue.controls],["settings",ue.settings],["about",ue.about],["story",ue.story]])}
      </div>
      ${n.canContinue?"":`<p class="note" id="nosave">${ue.noSave}</p>`}
    `):n.screen==="controls"?Bn(`
      <h1>${ue.controls}</h1>
      <div class="card">${ue.controlsCard.map(e=>`<p>${e}</p>`).join("")}</div>
      ${On([["back",ue.back]])}
    `):n.screen==="about"?Bn(`
      <h1>${ue.about}</h1>
      ${ue.aboutLines.map(e=>`<p>${e}</p>`).join("")}
      ${On([["back",ue.back]])}
    `):n.screen==="story"?Bn(`
      <h1>${ue.story}</h1>
      <p>${ue.storyBody}</p>
      ${On([["back",ue.back]])}
    `):n.screen==="pause"?Bn(`
      <h1>${ue.pause}</h1>
      <div class="stack">
        ${On([["resume",ue.resume],["controls",ue.controls],["settings",ue.settings],["title-btn",ue.endingTitle]])}
      </div>
    `):n.screen==="ending"?Bn(`
      <h1>${ue.title}</h1>
      <p>${ue.bossClear}</p>
      <p>${ue.ending}</p>
      <div class="row">
        ${On([["title-btn",ue.endingTitle],["about",ue.endingAbout],["story",ue.endingStory]])}
      </div>
    `):n.screen==="dead"?Bn(`
      <h1>${ue.death}</h1>
      <div class="row">
        ${On([["retry",ue.retry],["title-btn",ue.deathTitle]])}
      </div>
    `):n.screen==="settings"?Ch(n):""}function Bn(n){return`<div class="panel">${n}</div>`}function Ch(n){const e=n.assists,t=(s,r,a)=>`<label class="check"><input type="checkbox" id="${s}" ${a?"checked":""}> ${r}</label>`,i=wh.map(({action:s,label:r})=>{const a=n.bindings[s].map(Ah).join(", "),o=n.listening===s?ue.pressKey:a;return`<button type="button" data-bind="${s}">${r}: ${o}</button>`}).join("");return Bn(`
    <h1>${ue.settings}</h1>
    ${t("assist-master",ue.settingsLabels.master,e.master)}
    ${t("assist-damage",ue.settingsLabels.damage,e.damageAssist)}
    ${t("assist-dodge",ue.settingsLabels.dodge,e.extraIframes)}
    ${t("assist-soft",ue.settingsLabels.softLock,e.softLock)}
    ${t("assist-recenter",ue.settingsLabels.recenter,e.cameraRecenter)}
    ${t("assist-prompts",ue.settingsLabels.prompts,e.showPrompts)}
    ${t("assist-slow",ue.settingsLabels.slow,e.slowCombat)}
    <p class="note">${ue.slowHint}</p>
    <label class="field" for="telegraph">${ue.settingsLabels.telegraph}
      <select id="telegraph">
        <option value="amber" ${e.telegraphStyle==="amber"?"selected":""}>${ue.telegraphStyles.amber}</option>
        <option value="high" ${e.telegraphStyle==="high"?"selected":""}>${ue.telegraphStyles.high}</option>
        <option value="colorblind" ${e.telegraphStyle==="colorblind"?"selected":""}>${ue.telegraphStyles.colorblind}</option>
      </select>
    </label>
    ${t("wobble",ue.settingsLabels.wobble,n.textureWobble)}
    <label class="field" for="reduced">${ue.settingsLabels.reduced}
      <select id="reduced">
        <option value="auto" ${n.reduced==="auto"?"selected":""}>${ue.reducedModes.auto}</option>
        <option value="on" ${n.reduced==="on"?"selected":""}>${ue.reducedModes.on}</option>
        <option value="off" ${n.reduced==="off"?"selected":""}>${ue.reducedModes.off}</option>
      </select>
    </label>
    <label class="field" for="fov">${ue.fovValue(n.fov)}
      <input id="fov" type="range" min="50" max="75" step="1" value="${n.fov}">
    </label>
    <h2>${ue.settingsLabels.remap}</h2>
    <div class="remap">${i}</div>
    <div class="row">
      ${On([["reset",ue.settingsLabels.reset],["back",ue.settingsLabels.back]])}
    </div>
  `)}function Ph(n,e,t,i,s,r,a){const o=i-n,c=s-e,l=r-t,h=Math.hypot(o,c,l)||1,m=o/h,u=c/h,p=l/h;let _=h;for(const E of a){const f=n-E.x,d=e-E.y,v=t-E.z,b=f*m+d*u+v*p,y=f*f+d*d+v*v-E.r*E.r;if(y<=0){_=Math.min(_,1.7);continue}const A=b*b-y;if(A<0||b>0)continue;const w=-b-Math.sqrt(A);w>.15&&w<_&&(_=w-.18)}return _=Math.max(1.7,_),{x:n+m*_,y:e+u*_,z:t+p*_}}class Lh{constructor(e){this.camera=e}sway=0;snap=!0;update(e,t,i){const s=e.cameraYaw+this.sway,r=e.cameraPitch,a=4.5,o=Math.cos(r)*a,c=Math.sin(r)*a,l=e.player.x,h=e.player.y,m=e.player.z;let u=l,p=h+1.15,_=m;const E=e.enemies.find(A=>A.alive&&A.id===e.lockId);E&&(u=oi(u,E.x,.35),p=oi(p,E.y+1.3,.35),_=oi(_,E.z,.35));const f=l-Math.sin(s)*o,d=h+1.8+c,v=m-Math.cos(s)*o,b=Ph(l,h+1.2,m,f,d,v,t),y=this.snap?1:1-Math.exp(-10*i);this.snap=!1,this.camera.position.x=oi(this.camera.position.x,b.x,y),this.camera.position.y=oi(this.camera.position.y,b.y,y),this.camera.position.z=oi(this.camera.position.z,b.z,y),this.camera.lookAt(u,p,_)}dampSway(e,t){this.sway=Ps(this.sway,e,2,t)}}function ci(n,e=.15){const t=Math.abs(n);return t<e?0:Math.sign(n)*((t-e)/(1-e))}class Dh{constructor(e,t){this.getBindings=t,window.addEventListener("keydown",i=>{if(this.capture&&!i.repeat){i.preventDefault();const s=this.capture;this.capture=null,s(i.code);return}i.repeat||(this.keys.add(i.code),this.edges.add(i.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i.code)&&i.preventDefault())}),window.addEventListener("keyup",i=>this.keys.delete(i.code)),window.addEventListener("blur",()=>{this.keys.clear(),this.edges.clear()}),e.addEventListener("contextmenu",i=>i.preventDefault()),e.addEventListener("pointerdown",i=>{i.pointerType!=="touch"&&(i.button===0?(this.keys.add("mouse0"),this.edges.add("mouse0"),document.pointerLockElement!==e&&e.requestPointerLock()):i.button===2&&(this.keys.add("mouse2"),this.edges.add("mouse2")))}),window.addEventListener("pointerup",i=>{i.button===0&&this.keys.delete("mouse0"),i.button===2&&this.keys.delete("mouse2")}),window.addEventListener("mousemove",i=>{(document.pointerLockElement===e||(i.buttons&1)===1)&&(this.mouseX+=i.movementX,this.mouseY+=i.movementY)}),window.addEventListener("gamepadconnected",()=>{this.sawPad=!0}),window.addEventListener("gamepaddisconnected",()=>{this.sawPad&&(this.padLost=!0)})}touch={down:!1,x:0,y:0,attack:!1,dodge:!1,flare:!1,lock:!1,pause:!1,lookX:0,lookY:0,look:!1};capture=null;keys=new Set;edges=new Set;mouseX=0;mouseY=0;padLost=!1;sawPad=!1;prevButtons=[];consumePadLost(){const e=this.padLost;return this.padLost=!1,e}sample(e,t,i){const s={...Nl,...this.getBindings()},r=i?.00115:.0023;let a=this.mouseX*r,o=this.mouseY*r;this.mouseX=0,this.mouseY=0,this.touch.look&&(a=this.touch.lookX*(i?.0022:.0045),o=this.touch.lookY*(i?.0022:.0045)),this.touch.lookX=0,this.touch.lookY=0;const c=this.readPad(e,i);c&&Math.abs(c.lookX)+Math.abs(c.lookY)>0&&!this.touch.look&&(a=c.lookX,o=c.lookY);let l=0,h=0;this.touch.down?(l=ci(this.touch.x),h=ci(this.touch.y)):c&&(Math.abs(c.moveX)>0||Math.abs(c.moveY)>0)?(l=c.moveX,h=c.moveY):(this.held(s.left)&&(l-=1),this.held(s.right)&&(l+=1),this.held(s.up)&&(h+=1),this.held(s.down)&&(h-=1));const m=this.touch.attack||this.held(s.attack)||!!c?.attack,u=this.touch.dodge||this.edged(s.dodge)||!!c?.dodge,p=this.touch.flare||this.edged(s.flare)||!!c?.flare,_=this.touch.lock||this.edged(s.lockOn)||!!c?.lock,E=this.edged(s.interact),f=this.touch.pause||this.edged(s.pause)||!!c?.pause,d=this.keys.has("AltLeft")||this.keys.has("AltRight")||!!c?.slow;return this.touch.dodge=!1,this.touch.flare=!1,this.touch.lock=!1,this.touch.pause=!1,this.edges.clear(),t?{moveX:l,moveY:h,lookX:a,lookY:o,attack:m,dodge:u,flare:p,lockOn:_,interact:E,slow:d,pause:f}:{moveX:0,moveY:0,lookX:0,lookY:0,attack:!1,dodge:!1,flare:!1,lockOn:!1,interact:!1,slow:!1,pause:f}}held(e){return e.some(t=>this.keys.has(t))}edged(e){return e.some(t=>this.edges.has(t))}readPad(e,t){const i=navigator.getGamepads?.()??[],s=Array.from(i).find(c=>c&&c.connected);if(!s)return null;this.sawPad=!0;const r=s.buttons.map(c=>c.pressed||c.value>.5),a=c=>r[c]&&!this.prevButtons[c];this.prevButtons=r;const o=(t?1.05:2.1)*e;return{moveX:ci(s.axes[0]??0),moveY:ci(-(s.axes[1]??0)),lookX:ci(s.axes[2]??0)*o,lookY:ci(s.axes[3]??0)*o,attack:!!r[0],dodge:a(1),flare:a(2),lock:a(3)||a(11),pause:a(9),slow:(s.buttons[6]?.value??0)>.5}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ya="187",Ih=0,bo=1,Nh=2,Ls=1,Uh=2,ki=3,ti=0,Ut=1,hn=2,Ei=0,Vi=1,To=2,wo=3,Ao=4,Fh=5,yi=100,Oh=101,Bh=102,zh=103,kh=104,Gh=200,Hh=201,Vh=202,Wh=203,Ul=204,Fl=205,Xh=206,qh=207,Yh=208,$h=209,Kh=210,Zh=211,Jh=212,Qh=213,jh=214,Lr=0,Dr=1,Ir=2,qi=3,Nr=4,Ur=5,Fr=6,Or=7,Ea=0,eu=1,tu=2,wn=0,Ol=1,Bl=2,zl=3,kl=4,Gl=5,Hl=6,Vl=7,Wl=300,Ri=301,Yi=302,js=303,er=304,$i=1e3,En=1001,Br=1002,ot=1003,nu=1004,ls=1005,Nt=1006,tr=1007,Hn=1008,zt=1009,Xl=1010,ql=1011,Ki=1012,ba=1013,fn=1014,un=1015,pn=1016,Ta=1017,wa=1018,Ci=1020,Yl=35902,$l=35899,Kl=1021,Zl=1022,dn=1023,Wn=1026,Vn=1027,Jl=1028,Aa=1029,ni=1030,Ra=1031,Ca=1033,Ds=33776,Is=33777,Ns=33778,Us=33779,zr=35840,kr=35841,Gr=35842,Hr=35843,Vr=36196,Wr=37492,Xr=37496,qr=37488,Yr=37489,ks=37490,$r=37491,Kr=37808,Zr=37809,Jr=37810,Qr=37811,jr=37812,ea=37813,ta=37814,na=37815,ia=37816,sa=37817,ra=37818,aa=37819,oa=37820,la=37821,ca=36492,ha=36494,ua=36495,da=36283,fa=36284,Gs=36285,pa=36286,iu=3200,ma=0,su=1,kn="",It="srgb",Zi="srgb-linear",Hs="linear",Ze="srgb",nr=7680,ru=519,au=512,ou=513,lu=514,Ql=515,cu=516,hu=517,jl=518,ec=519,uu=35044,Ro="300 es",sn=2e3,Ji=2001;function du(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function fu(){const n=Vs("canvas");return n.style.display="block",n}const Co={};function Po(...n){const e="THREE."+n.shift();console.log(e,...n)}function tc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=tc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ye(...n){n=tc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Fs(...n){const e=n.join(" ");e in Co||(Co[e]=!0,Ce(...n))}function pu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const mu={[Lr]:Lr,[Ir]:Fr,[Nr]:Nr,[qi]:Ur,[Dr]:Dr,[Fr]:Ir,[Or]:Or,[Ur]:qi};class si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ir=Math.PI/180,ga=180/Math.PI;function ji(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function We(n,e,t){return Math.max(e,Math.min(t,n))}function gu(n,e){return(n%e+e)%e}function sr(n,e,t){return(1-t)*n+t*e}function _u(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Pa(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function xu(n,e){if(e.constructor===Float32Array)return n;const t=Pa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function vu(n,e){if(e.constructor===Float32Array)return n;const t=Pa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}class ze{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ri{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],m=i[s+3],u=r[a+0],p=r[a+1],_=r[a+2],E=r[a+3];if(m!==E||c!==u||l!==p||h!==_){let f=c*u+l*p+h*_+m*E;f<0&&(u=-u,p=-p,_=-_,E=-E,f=-f);let d=1-o;if(f<.9995){const v=Math.acos(f),b=Math.sin(v);d=Math.sin(d*v)/b,o=Math.sin(o*v)/b,c=c*d+u*o,l=l*d+p*o,h=h*d+_*o,m=m*d+E*o}else{c=c*d+u*o,l=l*d+p*o,h=h*d+_*o,m=m*d+E*o;const v=1/Math.sqrt(c*c+l*l+h*h+m*m);c*=v,l*=v,h*=v,m*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],m=r[a],u=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+h*m+c*p-l*u,e[t+1]=c*_+h*u+l*m-o*p,e[t+2]=l*_+h*p+o*u-c*m,e[t+3]=h*_-o*m-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),m=o(r/2),u=c(i/2),p=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=u*h*m+l*p*_,this._y=l*p*m-u*h*_,this._z=l*h*_+u*p*m,this._w=l*h*m-u*p*_;break;case"YXZ":this._x=u*h*m+l*p*_,this._y=l*p*m-u*h*_,this._z=l*h*_-u*p*m,this._w=l*h*m+u*p*_;break;case"ZXY":this._x=u*h*m-l*p*_,this._y=l*p*m+u*h*_,this._z=l*h*_+u*p*m,this._w=l*h*m-u*p*_;break;case"ZYX":this._x=u*h*m-l*p*_,this._y=l*p*m+u*h*_,this._z=l*h*_-u*p*m,this._w=l*h*m+u*p*_;break;case"YZX":this._x=u*h*m+l*p*_,this._y=l*p*m+u*h*_,this._z=l*h*_-u*p*m,this._w=l*h*m-u*p*_;break;case"XZY":this._x=u*h*m-l*p*_,this._y=l*p*m-u*h*_,this._z=l*h*_+u*p*m,this._w=l*h*m+u*p*_;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],m=t[10],u=i+o+m;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>m){const p=2*Math.sqrt(1+i-o-m);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>m){const p=2*Math.sqrt(1+o-i-m);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+m-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),m=2*(r*i-a*t);return this.x=t+c*l+a*m-o*h,this.y=i+c*h+o*l-r*m,this.z=s+c*m+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return rr.copy(this).projectOnVector(e),this.sub(rr)}reflect(e){return this.sub(rr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rr=new z,Lo=new ri;class Ne{static{this.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],m=i[7],u=i[2],p=i[5],_=i[8],E=s[0],f=s[3],d=s[6],v=s[1],b=s[4],y=s[7],A=s[2],w=s[5],g=s[8];return r[0]=a*E+o*v+c*A,r[3]=a*f+o*b+c*w,r[6]=a*d+o*y+c*g,r[1]=l*E+h*v+m*A,r[4]=l*f+h*b+m*w,r[7]=l*d+h*y+m*g,r[2]=u*E+p*v+_*A,r[5]=u*f+p*b+_*w,r[8]=u*d+p*y+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],m=h*a-o*l,u=o*c-h*r,p=l*r-a*c,_=t*m+i*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=m*E,e[1]=(s*l-h*i)*E,e[2]=(o*i-s*a)*E,e[3]=u*E,e[4]=(h*t-s*c)*E,e[5]=(s*r-o*t)*E,e[6]=p*E,e[7]=(i*c-l*t)*E,e[8]=(a*t-i*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ar.makeScale(e,t)),this}rotate(e){return Fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ar.makeRotation(-e)),this}translate(e,t){return Fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ar.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ar=new Ne,Do=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Io=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Su(){const n={enabled:!0,workingColorSpace:Zi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=An(s.r),s.g=An(s.g),s.b=An(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===kn?Hs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Zi]:{primaries:e,whitePoint:i,transfer:Hs,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:Ze,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),n}const Ve=Su();function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function bi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hi;class Mu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hi===void 0&&(hi=Vs("canvas")),hi.width=e.width,hi.height=e.height;const s=hi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=hi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=An(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yu=0;class La{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(or(s[a].image)):r.push(or(s[a]))}else r=or(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function or(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Eu=0;const lr=new z;class Rt extends si{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=En,s=En,r=Nt,a=Hn,o=dn,c=zt,l=Rt.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=ji(),this.name="",this.source=new La(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(lr).x}get height(){return this.source.getSize(lr).y}get depth(){return this.source.getSize(lr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $i:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $i:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Wl;Rt.DEFAULT_ANISOTROPY=1;class lt{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],m=c[8],u=c[1],p=c[5],_=c[9],E=c[2],f=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(m-E)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(m+E)<.1&&Math.abs(_+f)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,y=(p+1)/2,A=(d+1)/2,w=(h+u)/4,g=(m+E)/4,M=(_+f)/4;return b>y&&b>A?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=w/i,r=g/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=w/s,r=M/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=g/r,s=M/r),this.set(i,s,r,t),this}let v=Math.sqrt((f-_)*(f-_)+(m-E)*(m-E)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(f-_)/v,this.y=(m-E)/v,this.z=(u-h)/v,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bu extends si{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const s=i.count;for(let r=0;r<s;r++)this.textures[r]=new Rt({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new La(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends bu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class nc extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=ot,this.minFilter=ot,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tu extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=ot,this.minFilter=ot,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class st{static{this.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,c,l,h,m,u,p,_,E,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,m,u,p,_,E,f)}set(e,t,i,s,r,a,o,c,l,h,m,u,p,_,E,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=m,d[14]=u,d[3]=p,d[7]=_,d[11]=E,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ui.setFromMatrixColumn(e,0).length(),r=1/ui.setFromMatrixColumn(e,1).length(),a=1/ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*m,_=o*h,E=o*m;t[0]=c*h,t[4]=-c*m,t[8]=l,t[1]=p+_*l,t[5]=u-E*l,t[9]=-o*c,t[2]=E-u*l,t[6]=_+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*m,_=l*h,E=l*m;t[0]=u+E*o,t[4]=_*o-p,t[8]=a*l,t[1]=a*m,t[5]=a*h,t[9]=-o,t[2]=p*o-_,t[6]=E+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*m,_=l*h,E=l*m;t[0]=u-E*o,t[4]=-a*m,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*h,t[9]=E-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*m,_=o*h,E=o*m;t[0]=c*h,t[4]=_*l-p,t[8]=u*l+E,t[1]=c*m,t[5]=E*l+u,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,_=o*c,E=o*l;t[0]=c*h,t[4]=E-u*m,t[8]=_*m+p,t[1]=m,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*m+_,t[10]=u-E*m}else if(e.order==="XZY"){const u=a*c,p=a*l,_=o*c,E=o*l;t[0]=c*h,t[4]=-m,t[8]=l*h,t[1]=u*m+E,t[5]=a*h,t[9]=p*m-_,t[2]=_*m-p,t[6]=o*h,t[10]=E*m+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wu,e,Au)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Ln.crossVectors(i,Ot),Ln.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Ln.crossVectors(i,Ot)),Ln.normalize(),cs.crossVectors(Ot,Ln),s[0]=Ln.x,s[4]=cs.x,s[8]=Ot.x,s[1]=Ln.y,s[5]=cs.y,s[9]=Ot.y,s[2]=Ln.z,s[6]=cs.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],m=i[5],u=i[9],p=i[13],_=i[2],E=i[6],f=i[10],d=i[14],v=i[3],b=i[7],y=i[11],A=i[15],w=s[0],g=s[4],M=s[8],I=s[12],P=s[1],R=s[5],U=s[9],V=s[13],D=s[2],G=s[6],Y=s[10],k=s[14],te=s[3],X=s[7],Q=s[11],j=s[15];return r[0]=a*w+o*P+c*D+l*te,r[4]=a*g+o*R+c*G+l*X,r[8]=a*M+o*U+c*Y+l*Q,r[12]=a*I+o*V+c*k+l*j,r[1]=h*w+m*P+u*D+p*te,r[5]=h*g+m*R+u*G+p*X,r[9]=h*M+m*U+u*Y+p*Q,r[13]=h*I+m*V+u*k+p*j,r[2]=_*w+E*P+f*D+d*te,r[6]=_*g+E*R+f*G+d*X,r[10]=_*M+E*U+f*Y+d*Q,r[14]=_*I+E*V+f*k+d*j,r[3]=v*w+b*P+y*D+A*te,r[7]=v*g+b*R+y*G+A*X,r[11]=v*M+b*U+y*Y+A*Q,r[15]=v*I+b*V+y*k+A*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],m=e[6],u=e[10],p=e[14],_=e[3],E=e[7],f=e[11],d=e[15],v=c*p-l*u,b=o*p-l*m,y=o*u-c*m,A=a*p-l*h,w=a*u-c*h,g=a*m-o*h;return t*(E*v-f*b+d*y)-i*(_*v-f*A+d*w)+s*(_*b-E*A+d*g)-r*(_*y-E*w+f*g)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],m=e[9],u=e[10],p=e[11],_=e[12],E=e[13],f=e[14],d=e[15],v=t*o-i*a,b=t*c-s*a,y=t*l-r*a,A=i*c-s*o,w=i*l-r*o,g=s*l-r*c,M=h*E-m*_,I=h*f-u*_,P=h*d-p*_,R=m*f-u*E,U=m*d-p*E,V=u*d-p*f,D=v*V-b*U+y*R+A*P-w*I+g*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/D;return e[0]=(o*V-c*U+l*R)*G,e[1]=(s*U-i*V-r*R)*G,e[2]=(E*g-f*w+d*A)*G,e[3]=(u*w-m*g-p*A)*G,e[4]=(c*P-a*V-l*I)*G,e[5]=(t*V-s*P+r*I)*G,e[6]=(f*y-_*g-d*b)*G,e[7]=(h*g-u*y+p*b)*G,e[8]=(a*U-o*P+l*M)*G,e[9]=(i*P-t*U-r*M)*G,e[10]=(_*w-E*y+d*v)*G,e[11]=(m*y-h*w-p*v)*G,e[12]=(o*I-a*R-c*M)*G,e[13]=(t*R-i*I+s*M)*G,e[14]=(E*b-_*A-f*v)*G,e[15]=(h*A-m*b+u*v)*G,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,m=o+o,u=r*l,p=r*h,_=r*m,E=a*h,f=a*m,d=o*m,v=c*l,b=c*h,y=c*m,A=i.x,w=i.y,g=i.z;return s[0]=(1-(E+d))*A,s[1]=(p+y)*A,s[2]=(_-b)*A,s[3]=0,s[4]=(p-y)*w,s[5]=(1-(u+d))*w,s[6]=(f+v)*w,s[7]=0,s[8]=(_+b)*g,s[9]=(f-v)*g,s[10]=(1-(u+E))*g,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ui.set(s[0],s[1],s[2]).length();const o=ui.set(s[4],s[5],s[6]).length(),c=ui.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Kt.copy(this);const l=1/a,h=1/o,m=1/c;return Kt.elements[0]*=l,Kt.elements[1]*=l,Kt.elements[2]*=l,Kt.elements[4]*=h,Kt.elements[5]*=h,Kt.elements[6]*=h,Kt.elements[8]*=m,Kt.elements[9]*=m,Kt.elements[10]*=m,t.setFromRotationMatrix(Kt),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=sn,c=!1){const l=this.elements,h=2*r/(t-e),m=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let _,E;if(c)_=r/(a-r),E=a*r/(a-r);else if(o===sn)_=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===Ji)_=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=m,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=sn,c=!1){const l=this.elements,h=2/(t-e),m=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let _,E;if(c)_=1/(a-r),E=a/(a-r);else if(o===sn)_=-2/(a-r),E=-(a+r)/(a-r);else if(o===Ji)_=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=m,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ui=new z,Kt=new st,wu=new z(0,0,0),Au=new z(1,1,1),Ln=new z,cs=new z,Ot=new z,No=new st,Uo=new ri;class Rn{constructor(e=0,t=0,i=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],m=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-We(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return No.makeRotationFromQuaternion(e),this.setFromRotationMatrix(No,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uo.setFromEuler(this),this.setFromQuaternion(Uo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ru=0;const Fo=new z,di=new ri,gn=new st,hs=new z,Ui=new z,Cu=new z,Pu=new ri,Oo=new z(1,0,0),Bo=new z(0,1,0),zo=new z(0,0,1),ko={type:"added"},Lu={type:"removed"},fi={type:"childadded",child:null},cr={type:"childremoved",child:null};class Et extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new z,t=new Rn,i=new ri,s=new z(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Ne}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.multiply(di),this}rotateOnWorldAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.premultiply(di),this}rotateX(e){return this.rotateOnAxis(Oo,e)}rotateY(e){return this.rotateOnAxis(Bo,e)}rotateZ(e){return this.rotateOnAxis(zo,e)}translateOnAxis(e,t){return Fo.copy(e).applyQuaternion(this.quaternion),this.position.add(Fo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oo,e)}translateY(e){return this.translateOnAxis(Bo,e)}translateZ(e){return this.translateOnAxis(zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?hs.copy(e):hs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Ui,hs,this.up):gn.lookAt(hs,Ui,this.up),this.quaternion.setFromRotationMatrix(gn),s&&(gn.extractRotation(s.matrixWorld),di.setFromRotationMatrix(gn),this.quaternion.premultiply(di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ko),fi.child=e,this.dispatchEvent(fi),fi.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lu),cr.child=e,this.dispatchEvent(cr),cr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ko),fi.child=e,this.dispatchEvent(fi),fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Cu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const m=c[l];r(e.shapes,m)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),m=a(e.shapes),u=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Et.DEFAULT_UP=new z(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class bn extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Du={type:"move"};class hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const E of e.hand.values()){const f=t.getJointPose(E,i),d=this._getHandJoint(l,E);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],u=h.position.distanceTo(m.position),p=.02,_=.005;l.inputState.pinching&&u>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Du)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new bn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const sc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},us={h:0,s:0,l:0};function ur(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Be{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ve.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ve.workingColorSpace){if(e=gu(e,1),t=We(t,0,1),i=We(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ur(a,r,e+1/3),this.g=ur(a,r,e),this.b=ur(a,r,e-1/3)}return Ve.colorSpaceToWorking(this,s),this}setStyle(e,t=It){function i(r){r!==void 0&&parseFloat(r)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=sc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return Ve.workingToColorSpace(At.copy(this),e),Math.round(We(At.r*255,0,255))*65536+Math.round(We(At.g*255,0,255))*256+Math.round(We(At.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.workingToColorSpace(At.copy(this),t);const i=At.r,s=At.g,r=At.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const m=a-o;switch(l=h<=.5?m/(a+o):m/(2-a-o),a){case i:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-i)/m+2;break;case r:c=(i-s)/m+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=It){Ve.workingToColorSpace(At.copy(this),e);const t=At.r,i=At.g,s=At.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(us);const i=sr(Dn.h,us.h,t),s=sr(Dn.s,us.s,t),r=sr(Dn.l,us.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Be;Be.NAMES=sc;class Da{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Be(e),this.density=t}clone(){return new Da(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class rc extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new z,_n=new z,dr=new z,xn=new z,pi=new z,mi=new z,Go=new z,fr=new z,pr=new z,mr=new z,gr=new lt,_r=new lt,xr=new lt;class tn{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Zt.subVectors(s,t),_n.subVectors(i,t),dr.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(_n),c=Zt.dot(dr),l=_n.dot(_n),h=_n.dot(dr),m=a*l-o*o;if(m===0)return r.set(0,0,0),null;const u=1/m,p=(l*c-o*h)*u,_=(a*h-o*c)*u;return r.set(1-p-_,_,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(a,xn.y),c.addScaledVector(o,xn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return gr.setScalar(0),_r.setScalar(0),xr.setScalar(0),gr.fromBufferAttribute(e,t),_r.fromBufferAttribute(e,i),xr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(gr,r.x),a.addScaledVector(_r,r.y),a.addScaledVector(xr,r.z),a}static isFrontFacing(e,t,i,s){return Zt.subVectors(i,t),_n.subVectors(e,t),Zt.cross(_n).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Zt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;pi.subVectors(s,i),mi.subVectors(r,i),fr.subVectors(e,i);const c=pi.dot(fr),l=mi.dot(fr);if(c<=0&&l<=0)return t.copy(i);pr.subVectors(e,s);const h=pi.dot(pr),m=mi.dot(pr);if(h>=0&&m<=h)return t.copy(s);const u=c*m-h*l;if(u<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(i).addScaledVector(pi,a);mr.subVectors(e,r);const p=pi.dot(mr),_=mi.dot(mr);if(_>=0&&p<=_)return t.copy(r);const E=p*l-c*_;if(E<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(mi,o);const f=h*_-p*m;if(f<=0&&m-h>=0&&p-_>=0)return Go.subVectors(r,s),o=(m-h)/(m-h+(p-_)),t.copy(s).addScaledVector(Go,o);const d=1/(f+E+u);return a=E*d,o=u*d,t.copy(i).addScaledVector(pi,a).addScaledVector(mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class es{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jt):Jt.fromBufferAttribute(r,a),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fi),fs.subVectors(this.max,Fi),gi.subVectors(e.a,Fi),_i.subVectors(e.b,Fi),xi.subVectors(e.c,Fi),In.subVectors(_i,gi),Nn.subVectors(xi,_i),Kn.subVectors(gi,xi);let t=[0,-In.z,In.y,0,-Nn.z,Nn.y,0,-Kn.z,Kn.y,In.z,0,-In.x,Nn.z,0,-Nn.x,Kn.z,0,-Kn.x,-In.y,In.x,0,-Nn.y,Nn.x,0,-Kn.y,Kn.x,0];return!vr(t,gi,_i,xi,fs)||(t=[1,0,0,0,1,0,0,0,1],!vr(t,gi,_i,xi,fs))?!1:(ps.crossVectors(In,Nn),t=[ps.x,ps.y,ps.z],vr(t,gi,_i,xi,fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vn=[new z,new z,new z,new z,new z,new z,new z,new z],Jt=new z,ds=new es,gi=new z,_i=new z,xi=new z,In=new z,Nn=new z,Kn=new z,Fi=new z,fs=new z,ps=new z,Zn=new z;function vr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Zn.fromArray(n,r);const o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),c=e.dot(Zn),l=t.dot(Zn),h=i.dot(Zn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ut=new z,ms=new ze;let Iu=0;class jn extends si{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=uu,this.updateRanges=[],this.gpuType=un,this.version=0,this._normalizationScale=e!==void 0?Pa(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ms.fromBufferAttribute(this,t),ms.applyMatrix3(e),this.setXY(t,ms.x,ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):xu(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):vu(e,this.array)}}class ac extends jn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class oc extends jn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class et extends jn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Nu=new es,Oi=new z,Sr=new z;class Ia{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Nu.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oi.subVectors(e,this.center);const t=Oi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Oi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oi.copy(e.center).add(Sr)),this.expandByPoint(Oi.copy(e.center).sub(Sr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Uu=0;const Wt=new st,Mr=new Et,vi=new z,Bt=new es,Bi=new es,vt=new z;class Ft extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(du(e)?oc:ac)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ne().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,i){return Wt.makeTranslation(e,t,i),this.applyMatrix4(Wt),this}scale(e,t,i){return Wt.makeScale(e,t,i),this.applyMatrix4(Wt),this}lookAt(e){return Mr.lookAt(e),Mr.updateMatrix(),this.applyMatrix4(Mr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new et(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Bt.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Bi.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Bt.min,Bi.min),Bt.expandByPoint(vt),vt.addVectors(Bt.max,Bi.max),Bt.expandByPoint(vt)):(Bt.expandByPoint(Bi.min),Bt.expandByPoint(Bi.max))}Bt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)vt.fromBufferAttribute(o,l),c&&(vi.fromBufferAttribute(e,l),vt.add(vi)),s=Math.max(s,i.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new jn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(i.count);for(let I=0;I<i.count;I++)o[I]=new z,c[I]=new z;const h=new z,m=new z,u=new z,p=new ze,_=new ze,E=new ze,f=new z,d=new z;function v(I,P,R){l[I]=l[P]=l[R]=1,h.fromBufferAttribute(i,I),m.fromBufferAttribute(i,P),u.fromBufferAttribute(i,R),p.fromBufferAttribute(r,I),_.fromBufferAttribute(r,P),E.fromBufferAttribute(r,R),m.sub(h),u.sub(h),_.sub(p),E.sub(p);const U=1/(_.x*E.y-E.x*_.y);isFinite(U)&&(f.copy(m).multiplyScalar(E.y).addScaledVector(u,-_.y).multiplyScalar(U),d.copy(u).multiplyScalar(_.x).addScaledVector(m,-E.x).multiplyScalar(U),o[I].add(f),o[P].add(f),o[R].add(f),c[I].add(d),c[P].add(d),c[R].add(d))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,P=b.length;I<P;++I){const R=b[I],U=R.start,V=R.count;for(let D=U,G=U+V;D<G;D+=3)v(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const y=new z,A=new z,w=new z,g=new z;function M(I){w.fromBufferAttribute(s,I),g.copy(w);const P=o[I];y.copy(P),y.sub(w.multiplyScalar(w.dot(P))).normalize(),A.crossVectors(g,P);const U=A.dot(c[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,U)}for(let I=0,P=i.count;I<P;++I)l[I]&&M(I);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new jn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new z,r=new z,a=new z,o=new z,c=new z,l=new z,h=new z,m=new z;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),E=e.getX(u+1),f=e.getX(u+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,f),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,E),l.fromBufferAttribute(i,f),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(E,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,m=o.normalized,u=new l.constructor(c.length*h);let p=0,_=0;for(let E=0,f=c.length;E<f;E++){o.isInterleavedBufferAttribute?p=c[E]*o.data.stride+o.offset:p=c[E]*h;for(let d=0;d<h;d++)u[_++]=l[p++]}return new jn(u,h,m)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,m=l.length;h<m;h++){const u=l[h],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let m=0,u=l.length;m<u;m++){const p=l[m];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],m=r[l];for(let u=0,p=m.length;u<p;u++)h.push(m[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const m=a[l];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yr=new z,Fu=new z,Ou=new Ne;class zn{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=yr.subVectors(i,t).cross(Fu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(yr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ou.getNormalMatrix(e),s=this.coplanarPoint(yr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Bu=0;class ts extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=Vi,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ul,this.blendDst=Fl,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ru,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new zn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Sn=new z,Er=new z,gs=new z,_s=new z;class zu{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Er.copy(e).add(t).multiplyScalar(.5),gs.copy(t).sub(e).normalize(),_s.copy(this.origin).sub(Er);const r=e.distanceTo(t)*.5,a=-this.direction.dot(gs),o=_s.dot(this.direction),c=-_s.dot(gs),l=_s.lengthSq(),h=Math.abs(1-a*a);let m,u,p,_;if(h>0)if(m=a*c-o,u=a*o-c,_=r*h,m>=0)if(u>=-_)if(u<=_){const E=1/h;m*=E,u*=E,p=m*(m+a*u+2*o)+u*(a*m+u+2*c)+l}else u=r,m=Math.max(0,-(a*u+o)),p=-m*m+u*(u+2*c)+l;else u=-r,m=Math.max(0,-(a*u+o)),p=-m*m+u*(u+2*c)+l;else u<=-_?(m=Math.max(0,-(-a*r+o)),u=m>0?-r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l):u<=_?(m=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(m=Math.max(0,-(a*r+o)),u=m>0?r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l);else u=a>0?-r:r,m=Math.max(0,-(a*u+o)),p=-m*m+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Er).addScaledVector(gs,u),p}intersectSphere(e,t){if(e.radius<0)return null;Sn.subVectors(e.center,this.origin);const i=Sn.dot(this.direction),s=Sn.dot(Sn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(e.min.z-u.z)*m,c=(e.max.z-u.z)*m):(o=(e.max.z-u.z)*m,c=(e.min.z-u.z)*m),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,m=e.x-a.x,u=e.y-a.y,p=e.z-a.z,_=t.x-a.x,E=t.y-a.y,f=t.z-a.z,d=i.x-a.x,v=i.y-a.y,b=i.z-a.z,y=Math.abs(c),A=Math.abs(l),w=Math.abs(h);let g,M,I,P,R,U,V,D,G,Y,k,te;if(y>=A&&y>=w?(I=c,U=m,G=_,te=d,c>=0?(g=l,M=h,P=u,R=p,V=E,D=f,Y=v,k=b):(g=h,M=l,P=p,R=u,V=f,D=E,Y=b,k=v)):A>=w?(I=l,U=u,G=E,te=v,l>=0?(g=h,M=c,P=p,R=m,V=f,D=_,Y=b,k=d):(g=c,M=h,P=m,R=p,V=_,D=f,Y=d,k=b)):(I=h,U=p,G=f,te=b,h>=0?(g=c,M=l,P=m,R=u,V=_,D=E,Y=d,k=v):(g=l,M=c,P=u,R=m,V=E,D=_,Y=v,k=d)),I===0)return null;const X=g/I,Q=M/I,j=1/I,ye=P-X*U,Le=R-Q*U,K=V-X*G,me=D-Q*G,ve=Y-X*te,we=k-Q*te,ge=ve*me-we*K,Ie=ye*we-Le*ve,ct=K*Le-me*ye;if(s){if(ge<0||Ie<0||ct<0)return null}else if((ge<0||Ie<0||ct<0)&&(ge>0||Ie>0||ct>0))return null;const Re=ge+Ie+ct;if(Re===0)return null;const $e=j*(ge*U+Ie*G+ct*te);return(Re>0?$e<0:$e>0)?null:this.at($e/Re,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lc extends ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ho=new st,Jn=new zu,xs=new Ia,Vo=new z,vs=new z,Ss=new z,Ms=new z,br=new z,ys=new z,Wo=new z,Es=new z;class je extends Et{constructor(e=new Ft,t=new lc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ys.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],m=r[c];h!==0&&(br.fromBufferAttribute(m,e),a?ys.addScaledVector(br,h):ys.addScaledVector(br.sub(t),h))}t.add(ys)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(r),Jn.copy(e.ray).recast(e.near),!(xs.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(xs,Vo)===null||Jn.origin.distanceToSquared(Vo)>(e.far-e.near)**2))&&(Ho.copy(r).invert(),Jn.copy(e.ray).applyMatrix4(Ho),!(i.boundingBox!==null&&Jn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Jn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,m=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=u.length;_<E;_++){const f=u[_],d=a[f.materialIndex],v=Math.max(f.start,p.start),b=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));for(let y=v,A=b;y<A;y+=3){const w=o.getX(y),g=o.getX(y+1),M=o.getX(y+2);s=bs(this,d,e,i,l,h,m,w,g,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let f=_,d=E;f<d;f+=3){const v=o.getX(f),b=o.getX(f+1),y=o.getX(f+2);s=bs(this,a,e,i,l,h,m,v,b,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,E=u.length;_<E;_++){const f=u[_],d=a[f.materialIndex],v=Math.max(f.start,p.start),b=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));for(let y=v,A=b;y<A;y+=3){const w=y,g=y+1,M=y+2;s=bs(this,d,e,i,l,h,m,w,g,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),E=Math.min(c.count,p.start+p.count);for(let f=_,d=E;f<d;f+=3){const v=f,b=f+1,y=f+2;s=bs(this,a,e,i,l,h,m,v,b,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function ku(n,e,t,i,s,r,a,o){let c;if(e.side===Ut?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===ti,o),c===null)return null;Es.copy(o),Es.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Es);return l<t.near||l>t.far?null:{distance:l,point:Es.clone(),object:n}}function bs(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,vs),n.getVertexPosition(c,Ss),n.getVertexPosition(l,Ms);const h=ku(n,e,t,i,vs,Ss,Ms,Wo);if(h){const m=new z;tn.getBarycoord(Wo,vs,Ss,Ms,m),s&&(h.uv=tn.getInterpolatedAttribute(s,o,c,l,m,new ze)),r&&(h.uv1=tn.getInterpolatedAttribute(r,o,c,l,m,new ze)),a&&(h.normal=tn.getInterpolatedAttribute(a,o,c,l,m,new z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new z,materialIndex:0};tn.getNormal(vs,Ss,Ms,u.normal),h.face=u,h.barycoord=m}return h}class Gu extends Rt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=ot,h=ot,m,u){super(null,a,o,c,l,h,s,r,m,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qn=new Ia,Hu=new ze(.5,.5),Ts=new z;class Qi{constructor(e=new zn,t=new zn,i=new zn,s=new zn,r=new zn,a=new zn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=sn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],m=r[5],u=r[6],p=r[7],_=r[8],E=r[9],f=r[10],d=r[11],v=r[12],b=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-a,p-h,d-_,A-v).normalize(),s[1].setComponents(l+a,p+h,d+_,A+v).normalize(),s[2].setComponents(l+o,p+m,d+E,A+b).normalize(),s[3].setComponents(l-o,p-m,d-E,A-b).normalize(),i)s[4].setComponents(c,u,f,y).normalize(),s[5].setComponents(l-c,p-u,d-f,A-y).normalize();else if(s[4].setComponents(l-c,p-u,d-f,A-y).normalize(),t===sn)s[5].setComponents(l+c,p+u,d+f,A+y).normalize();else if(t===Ji)s[5].setComponents(c,u,f,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(e){Qn.center.set(0,0,0);const t=Hu.distanceTo(e.center);return Qn.radius=.7071067811865476+t,Qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ts.x=s.normal.x>0?e.max.x:e.min.x,Ts.y=s.normal.y>0?e.max.y:e.min.y,Ts.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Xo=new st;class Na{constructor(){this.coordinateSystem=sn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Xo.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new Qi),i[s].setFromProjectionMatrix(Xo,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Qi),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new Na().copy(this)}}class cc extends Rt{constructor(e=[],t=Ri,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vu extends Rt{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pi extends Rt{constructor(e,t,i=fn,s,r,a,o=ot,c=ot,l,h=Wn,m=1){if(h!==Wn&&h!==Vn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:m};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new La(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class hc extends Pi{constructor(e,t=fn,i=Ri,s,r,a=ot,o=ot,c,l=Wn){const h={width:e,height:e,depth:1},m=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uc extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ns extends Ft{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],m=[];let u=0,p=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(m,2));function _(E,f,d,v,b,y,A,w,g,M,I){const P=y/g,R=A/M,U=y/2,V=A/2,D=w/2,G=g+1,Y=M+1;let k=0,te=0;const X=new z;for(let Q=0;Q<Y;Q++){const j=Q*R-V;for(let ye=0;ye<G;ye++){const Le=ye*P-U;X[E]=Le*v,X[f]=j*b,X[d]=D,l.push(X.x,X.y,X.z),X[E]=0,X[f]=0,X[d]=w>0?1:-1,h.push(X.x,X.y,X.z),m.push(ye/g),m.push(1-Q/M),k+=1}}for(let Q=0;Q<M;Q++)for(let j=0;j<g;j++){const ye=u+j+G*Q,Le=u+j+G*(Q+1),K=u+(j+1)+G*(Q+1),me=u+(j+1)+G*Q;c.push(ye,Le,me),c.push(Le,K,me),te+=6}o.addGroup(p,te,I),p+=te,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yt extends Ft{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],m=[],u=[],p=[];let _=0;const E=[],f=i/2;let d=0;v(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new et(m,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(p,2));function v(){const y=new z,A=new z;let w=0;const g=(t-e)/i;for(let M=0;M<=r;M++){const I=[],P=M/r,R=P*(t-e)+e;for(let U=0;U<=s;U++){const V=U/s,D=V*c+o,G=Math.sin(D),Y=Math.cos(D);A.x=R*G,A.y=-P*i+f,A.z=R*Y,m.push(A.x,A.y,A.z),y.set(G,g,Y).normalize(),u.push(y.x,y.y,y.z),p.push(V,1-P),I.push(_++)}E.push(I)}for(let M=0;M<s;M++)for(let I=0;I<r;I++){const P=E[I][M],R=E[I+1][M],U=E[I+1][M+1],V=E[I][M+1];(e>0||I!==0)&&(h.push(P,R,V),w+=3),(t>0||I!==r-1)&&(h.push(R,U,V),w+=3)}l.addGroup(d,w,0),d+=w}function b(y){const A=_,w=new ze,g=new z;let M=0;const I=y===!0?e:t,P=y===!0?1:-1;for(let U=1;U<=s;U++)m.push(0,f*P,0),u.push(0,P,0),p.push(.5,.5),_++;const R=_;for(let U=0;U<=s;U++){const D=U/s*c+o,G=Math.cos(D),Y=Math.sin(D);g.x=I*Y,g.y=f*P,g.z=I*G,m.push(g.x,g.y,g.z),u.push(0,P,0),w.x=G*.5+.5,w.y=Y*.5*P+.5,p.push(w.x,w.y),_++}for(let U=0;U<s;U++){const V=A+U,D=R+U;y===!0?h.push(D,D+1,V):h.push(D+1,D,V),M+=3}l.addGroup(d,M,y===!0?1:2),d+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class is extends yt{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new is(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xs extends Ft{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),l(i),h(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const b=new z,y=new z,A=new z;for(let w=0;w<t.length;w+=3)p(t[w+0],b),p(t[w+1],y),p(t[w+2],A),c(b,y,A,v)}function c(v,b,y,A){const w=A+1,g=[];for(let M=0;M<=w;M++){g[M]=[];const I=v.clone().lerp(y,M/w),P=b.clone().lerp(y,M/w),R=w-M;for(let U=0;U<=R;U++)U===0&&M===w?g[M][U]=I:g[M][U]=I.clone().lerp(P,U/R)}for(let M=0;M<w;M++)for(let I=0;I<2*(w-M)-1;I++){const P=Math.floor(I/2);I%2===0?(u(g[M][P+1]),u(g[M+1][P]),u(g[M][P])):(u(g[M][P+1]),u(g[M+1][P+1]),u(g[M+1][P]))}}function l(v){const b=new z;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(v),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function h(){const v=new z;for(let b=0;b<r.length;b+=3){v.x=r[b+0],v.y=r[b+1],v.z=r[b+2];const y=f(v)/2/Math.PI+.5,A=d(v)/Math.PI+.5;a.push(y,1-A)}_(),m()}function m(){for(let v=0;v<a.length;v+=6){const b=a[v+0],y=a[v+2],A=a[v+4],w=Math.max(b,y,A),g=Math.min(b,y,A);w>.9&&g<.1&&(b<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),A<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function p(v,b){const y=v*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function _(){const v=new z,b=new z,y=new z,A=new z,w=new ze,g=new ze,M=new ze;for(let I=0,P=0;I<r.length;I+=9,P+=6){v.set(r[I+0],r[I+1],r[I+2]),b.set(r[I+3],r[I+4],r[I+5]),y.set(r[I+6],r[I+7],r[I+8]),w.set(a[P+0],a[P+1]),g.set(a[P+2],a[P+3]),M.set(a[P+4],a[P+5]),A.copy(v).add(b).add(y).divideScalar(3);const R=f(A);E(w,P+0,v,R),E(g,P+2,b,R),E(M,P+4,y,R)}}function E(v,b,y,A){A<0&&v.x===1&&(a[b]=v.x-1),y.x===0&&y.z===0&&(a[b]=A/2/Math.PI+.5)}function f(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.vertices,e.indices,e.radius,e.detail)}}class Wi extends Xs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wi(e.radius,e.detail)}}class Gn extends Xs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gn(e.radius,e.detail)}}class Di extends Ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,m=e/o,u=t/c,p=[],_=[],E=[],f=[];for(let d=0;d<h;d++){const v=d*u-a;for(let b=0;b<l;b++){const y=b*m-r;_.push(y,-v,0),E.push(0,0,1),f.push(b/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<o;v++){const b=v+l*d,y=v+l*(d+1),A=v+1+l*(d+1),w=v+1+l*d;p.push(b,y,w),p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(E,3)),this.setAttribute("uv",new et(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ua extends Ft{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let m=e;const u=(t-e)/s,p=new z,_=new ze;for(let E=0;E<=s;E++){for(let f=0;f<=i;f++){const d=r+f/i*a;p.x=m*Math.cos(d),p.y=m*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,h.push(_.x,_.y)}m+=u}for(let E=0;E<s;E++){const f=E*(i+1);for(let d=0;d<i;d++){const v=d+f,b=v,y=v+i+1,A=v+i+2,w=v+1;o.push(b,y,w),o.push(y,A,w)}}this.setIndex(o),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ua(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class qs extends Ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],m=new z,u=new z,p=[],_=[],E=[],f=[];for(let d=0;d<=i;d++){const v=[],b=d/i,y=a+b*o,A=e*Math.cos(y),w=Math.sqrt(e*e-A*A);let g=0;d===0&&a===0?g=.5/t:d===i&&c===Math.PI&&(g=-.5/t);for(let M=0;M<=t;M++){const I=M/t,P=s+I*r;m.x=-w*Math.cos(P),m.y=A,m.z=w*Math.sin(P),_.push(m.x,m.y,m.z),u.copy(m).normalize(),E.push(u.x,u.y,u.z),f.push(I+g,1-b),v.push(l++)}h.push(v)}for(let d=0;d<i;d++)for(let v=0;v<t;v++){const b=h[d][v+1],y=h[d][v],A=h[d+1][v],w=h[d+1][v+1];(d!==0||a>0)&&p.push(b,y,w),(d!==i-1||c<Math.PI)&&p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(E,3)),this.setAttribute("uv",new et(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Li(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(qo(s))s.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(qo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Pt(n){const e={};for(let t=0;t<n.length;t++){const i=Li(n[t]);for(const s in i)e[s]=i[s]}return e}function qo(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Wu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function dc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const Xu={clone:Li,merge:Pt};var qu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends ts{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qu,this.fragmentShader=Yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=Wu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Be().setHex(s.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new z().fromArray(s.value);break;case"v4":this.uniforms[i].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ne().fromArray(s.value);break;case"m4":this.uniforms[i].value=new st().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class $u extends Xn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ti extends ts{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Ea,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ku extends ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zu extends ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ys extends Et{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Ju extends Ys{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Tr=new st,Yo=new z,$o=new z;class fc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=zt,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Yo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yo),$o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($o),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Tr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Tr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ji||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Tr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ws=new z,As=new ri,on=new z;class pc extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ws,As,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ws,As,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ws,As,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ws,As,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Un=new z,Ko=new ze,Zo=new ze;class qt extends pc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ga*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,Ko,Zo),t.subVectors(Zo,Ko)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ir*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Qu extends fc{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}}class wi extends Ys{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Qu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Fa extends pc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ju extends fc{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ed extends Ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new ju}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class td extends Ys{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Si=-90,Mi=1;class _a extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(Si,Mi,e,t);s.layers=this.layers,this.add(s);const r=new qt(Si,Mi,e,t);r.layers=this.layers,this.add(r);const a=new qt(Si,Mi,e,t);a.layers=this.layers,this.add(a);const o=new qt(Si,Mi,e,t);o.layers=this.layers,this.add(o);const c=new qt(Si,Mi,e,t);c.layers=this.layers,this.add(c);const l=new qt(Si,Mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===sn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ji)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,m=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=E,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(m,u,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class nd extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function Jo(n,e,t,i){const s=id(i);switch(t){case Kl:return n*e;case Jl:return n*e/s.components*s.byteLength;case Aa:return n*e/s.components*s.byteLength;case ni:return n*e*2/s.components*s.byteLength;case Ra:return n*e*2/s.components*s.byteLength;case Zl:return n*e*3/s.components*s.byteLength;case dn:return n*e*4/s.components*s.byteLength;case Ca:return n*e*4/s.components*s.byteLength;case Ds:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ns:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kr:case Hr:return Math.max(n,16)*Math.max(e,8)/4;case zr:case Gr:return Math.max(n,8)*Math.max(e,8)/2;case Vr:case Wr:case qr:case Yr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xr:case ks:case $r:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Jr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qr:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case jr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ea:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ta:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case na:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ia:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case sa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ra:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case aa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case la:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ca:case ha:case ua:return Math.ceil(n/4)*Math.ceil(e/4)*16;case da:case fa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Gs:case pa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function id(n){switch(n){case zt:case Xl:return{byteLength:1,components:1};case Ki:case ql:case pn:return{byteLength:2,components:1};case Ta:case wa:return{byteLength:2,components:4};case fn:case ba:case un:return{byteLength:4,components:1};case Yl:case $l:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ya}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ya);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mc(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function sd(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,m=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:m}}function i(o,c,l){const h=c.array,m=c.updateRanges;if(n.bindBuffer(l,o),m.length===0)n.bufferSubData(l,0,h);else{m.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<m.length;p++){const _=m[u],E=m[p];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++u,m[u]=E)}m.length=u+1;for(let p=0,_=m.length;p<_;p++){const E=m[p];n.bufferSubData(l,E.start*h.BYTES_PER_ELEMENT,h,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ad=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,od=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ud=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,md=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_d=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Td=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Rd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Pd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ud=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Bd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$d=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Zd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,af=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,lf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,df=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_f=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vf=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ef=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Af=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Rf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,If=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Uf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Of=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Yf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$f=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ep=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ap=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lp=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ap=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Up=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:rd,alphahash_pars_fragment:ad,alphamap_fragment:od,alphamap_pars_fragment:ld,alphatest_fragment:cd,alphatest_pars_fragment:hd,aomap_fragment:ud,aomap_pars_fragment:dd,batching_pars_vertex:fd,batching_vertex:pd,begin_vertex:md,beginnormal_vertex:gd,bsdfs:_d,iridescence_fragment:xd,bumpmap_pars_fragment:vd,clipping_planes_fragment:Sd,clipping_planes_pars_fragment:Md,clipping_planes_pars_vertex:yd,clipping_planes_vertex:Ed,color_fragment:bd,color_pars_fragment:Td,color_pars_vertex:wd,color_vertex:Ad,common:Rd,defaultnormal_vertex:Cd,displacementmap_pars_vertex:Pd,displacementmap_vertex:Ld,emissivemap_fragment:Dd,emissivemap_pars_fragment:Id,colorspace_fragment:Nd,colorspace_pars_fragment:Ud,envmap_fragment:Fd,envmap_common_pars_fragment:Od,envmap_pars_fragment:Bd,envmap_pars_vertex:zd,envmap_physical_pars_fragment:Zd,envmap_vertex:kd,fog_vertex:Gd,fog_pars_vertex:Hd,fog_fragment:Vd,fog_pars_fragment:Wd,gradientmap_pars_fragment:Xd,lightmap_pars_fragment:qd,lights_lambert_fragment:Yd,lights_lambert_pars_fragment:$d,lights_pars_begin:Kd,lights_toon_fragment:Jd,lights_toon_pars_fragment:Qd,lights_phong_fragment:jd,lights_phong_pars_fragment:ef,lights_physical_fragment:tf,lights_physical_pars_fragment:nf,lights_fragment_begin:sf,lights_fragment_maps:rf,lights_fragment_end:af,lightprobes_pars_fragment:of,logdepthbuf_fragment:lf,logdepthbuf_pars_fragment:cf,logdepthbuf_pars_vertex:hf,logdepthbuf_vertex:uf,map_fragment:df,map_pars_fragment:ff,map_particle_fragment:pf,map_particle_pars_fragment:mf,metalnessmap_fragment:gf,metalnessmap_pars_fragment:_f,morphinstance_vertex:xf,morphcolor_vertex:vf,morphnormal_vertex:Sf,morphtarget_pars_vertex:Mf,morphtarget_vertex:yf,normal_fragment_begin:Ef,normal_fragment_maps:bf,normal_pars_fragment:Tf,normal_pars_vertex:wf,normal_vertex:Af,normalmap_pars_fragment:Rf,clearcoat_normal_fragment_begin:Cf,clearcoat_normal_fragment_maps:Pf,clearcoat_pars_fragment:Lf,iridescence_pars_fragment:Df,opaque_fragment:If,packing:Nf,premultiplied_alpha_fragment:Uf,project_vertex:Ff,dithering_fragment:Of,dithering_pars_fragment:Bf,roughnessmap_fragment:zf,roughnessmap_pars_fragment:kf,shadowmap_pars_fragment:Gf,shadowmap_pars_vertex:Hf,shadowmap_vertex:Vf,shadowmask_pars_fragment:Wf,skinbase_vertex:Xf,skinning_pars_vertex:qf,skinning_vertex:Yf,skinnormal_vertex:$f,specularmap_fragment:Kf,specularmap_pars_fragment:Zf,tonemapping_fragment:Jf,tonemapping_pars_fragment:Qf,transmission_fragment:jf,transmission_pars_fragment:ep,uv_pars_fragment:tp,uv_pars_vertex:np,uv_vertex:ip,worldpos_vertex:sp,background_vert:rp,background_frag:ap,backgroundCube_vert:op,backgroundCube_frag:lp,cube_vert:cp,cube_frag:hp,depth_vert:up,depth_frag:dp,distance_vert:fp,distance_frag:pp,equirect_vert:mp,equirect_frag:gp,linedashed_vert:_p,linedashed_frag:xp,meshbasic_vert:vp,meshbasic_frag:Sp,meshlambert_vert:Mp,meshlambert_frag:yp,meshmatcap_vert:Ep,meshmatcap_frag:bp,meshnormal_vert:Tp,meshnormal_frag:wp,meshphong_vert:Ap,meshphong_frag:Rp,meshphysical_vert:Cp,meshphysical_frag:Pp,meshtoon_vert:Lp,meshtoon_frag:Dp,points_vert:Ip,points_frag:Np,shadow_vert:Up,shadow_frag:Fp,sprite_vert:Op,sprite_frag:Bp},pe={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},cn={basic:{uniforms:Pt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Pt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Pt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Pt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Pt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Be(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Pt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Pt([pe.points,pe.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Pt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Pt([pe.common,pe.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Pt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Pt([pe.sprite,pe.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distance:{uniforms:Pt([pe.common,pe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distance_vert,fragmentShader:Oe.distance_frag},shadow:{uniforms:Pt([pe.lights,pe.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};cn.physical={uniforms:Pt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ne},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Rs={r:0,b:0,g:0},zp=new st,gc=new Ne;gc.set(-1,0,0,0,1,0,0,0,1);function kp(n,e,t,i,s,r){const a=new Be(0);let o=s===!0?0:1,c,l,h=null,m=0,u=null;function p(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){const y=v.backgroundBlurriness>0;b=e.get(b,y)}return b}function _(v){let b=!1;const y=p(v);y===null?f(a,o):y&&y.isColor&&(f(y,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function E(v,b){const y=p(b);y&&y.isCubeTexture?(l===void 0&&(l=new je(new ns(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Li(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zp.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gc),l.material.toneMapped=Ve.getTransfer(y.colorSpace)!==Ze,(h!==y||m!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,m=y.version,u=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new je(new Di(2,2),new Xn({name:"BackgroundMaterial",uniforms:Li(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ve.getTransfer(y.colorSpace)!==Ze,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||m!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,m=y.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,b){v.getRGB(Rs,dc(n)),t.buffers.color.setClear(Rs.r,Rs.g,Rs.b,b,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,f(a,o)},render:_,addToRenderList:E,dispose:d}}function Gp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(R,U,V,D,G){let Y=!1;const k=m(R,D,V,U);r!==k&&(r=k,l(r.object)),Y=p(R,D,V,G),Y&&_(R,D,V,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(R,U,V,D),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function h(R){return n.deleteVertexArray(R)}function m(R,U,V,D){const G=D.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const k=R.isInstancedMesh===!0?R.id:0;let te=Y[k];te===void 0&&(te={},Y[k]=te);let X=te[V.id];X===void 0&&(X={},te[V.id]=X);let Q=X[G];return Q===void 0&&(Q=u(c()),X[G]=Q),Q}function u(R){const U=[],V=[],D=[];for(let G=0;G<t;G++)U[G]=0,V[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:D,object:R,attributes:{},index:null}}function p(R,U,V,D){const G=r.attributes,Y=U.attributes;let k=0;const te=V.getAttributes();for(const X in te)if(te[X].location>=0){const j=G[X];let ye=Y[X];if(ye===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(ye=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(ye=R.instanceColor)),j===void 0||j.attribute!==ye||ye&&j.data!==ye.data)return!0;k++}return r.attributesNum!==k||r.index!==D}function _(R,U,V,D){const G={},Y=U.attributes;let k=0;const te=V.getAttributes();for(const X in te)if(te[X].location>=0){let j=Y[X];j===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(j=R.instanceColor));const ye={};ye.attribute=j,j&&j.data&&(ye.data=j.data),G[X]=ye,k++}r.attributes=G,r.attributesNum=k,r.index=D}function E(){const R=r.newAttributes;for(let U=0,V=R.length;U<V;U++)R[U]=0}function f(R){d(R,0)}function d(R,U){const V=r.newAttributes,D=r.enabledAttributes,G=r.attributeDivisors;V[R]=1,D[R]===0&&(n.enableVertexAttribArray(R),D[R]=1),G[R]!==U&&(n.vertexAttribDivisor(R,U),G[R]=U)}function v(){const R=r.newAttributes,U=r.enabledAttributes;for(let V=0,D=U.length;V<D;V++)U[V]!==R[V]&&(n.disableVertexAttribArray(V),U[V]=0)}function b(R,U,V,D,G,Y,k){k===!0?n.vertexAttribIPointer(R,U,V,G,Y):n.vertexAttribPointer(R,U,V,D,G,Y)}function y(R,U,V,D){E();const G=D.attributes,Y=V.getAttributes(),k=U.defaultAttributeValues;for(const te in Y){const X=Y[te];if(X.location>=0){let Q=G[te];if(Q===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor)),Q!==void 0){const j=Q.normalized,ye=Q.itemSize,Le=e.get(Q);if(Le===void 0)continue;const K=Le.buffer,me=Le.type,ve=Le.bytesPerElement,we=me===n.INT||me===n.UNSIGNED_INT||Q.gpuType===ba;if(Q.isInterleavedBufferAttribute){const ge=Q.data,Ie=ge.isInterleavedBuffer===!0?ge.stride:ge.itemSize,ct=Q.offset;if(ge.isInstancedInterleavedBuffer||ge.isInstancedBufferAttribute){for(let Re=0;Re<X.locationSize;Re++)d(X.location+Re,ge.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Re=0;Re<X.locationSize;Re++)f(X.location+Re);n.bindBuffer(n.ARRAY_BUFFER,K);for(let Re=0;Re<X.locationSize;Re++)b(X.location+Re,ye/X.locationSize,me,j,Ie*ve,(ct+ye/X.locationSize*Re)*ve,we)}else{if(Q.isInstancedBufferAttribute){for(let ge=0;ge<X.locationSize;ge++)d(X.location+ge,Q.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ge=0;ge<X.locationSize;ge++)f(X.location+ge);n.bindBuffer(n.ARRAY_BUFFER,K);for(let ge=0;ge<X.locationSize;ge++)b(X.location+ge,ye/X.locationSize,me,j,ye*ve,ye/X.locationSize*ge*ve,we)}}else if(k!==void 0){const j=k[te];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(X.location,j);break;case 3:n.vertexAttrib3fv(X.location,j);break;case 4:n.vertexAttrib4fv(X.location,j);break;default:n.vertexAttrib1fv(X.location,j)}}}}v()}function A(){I();for(const R in i){const U=i[R];for(const V in U){const D=U[V];for(const G in D){const Y=D[G];for(const k in Y)h(Y[k].object),delete Y[k];delete D[G]}}delete i[R]}}function w(R){if(i[R.id]===void 0)return;const U=i[R.id];for(const V in U){const D=U[V];for(const G in D){const Y=D[G];for(const k in Y)h(Y[k].object),delete Y[k];delete D[G]}}delete i[R.id]}function g(R){for(const U in i){const V=i[U];for(const D in V){const G=V[D];if(G[R.id]===void 0)continue;const Y=G[R.id];for(const k in Y)h(Y[k].object),delete Y[k];delete G[R.id]}}}function M(R){for(const U in i){const V=i[U],D=R.isInstancedMesh===!0?R.id:0,G=V[D];if(G!==void 0){for(const Y in G){const k=G[Y];for(const te in k)h(k[te].object),delete k[te];delete G[Y]}delete V[D],Object.keys(V).length===0&&delete i[U]}}}function I(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:g,initAttributes:E,enableAttribute:f,disableUnusedAttributes:v}}function Hp(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Vp(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==dn&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const M=g===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==zt&&g!==un&&!M&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(g){if(g==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ce("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&m===!1;t.reversedDepthBuffer===!0&&m===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&m===!0&&Ce("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:y,maxSamples:A,samples:w}}function Wp(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new zn,o=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const p=m.length!==0||u||i!==0||s;return s=u,i=m.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,u){t=h(m,u,0)},this.setState=function(m,u,p){const _=m.clippingPlanes,E=m.clipIntersection,f=m.clipShadows,d=n.get(m);if(!s||_===null||_.length===0||r&&!f)r?h(null):l();else{const v=r?0:i,b=v*4;let y=d.clippingState||null;c.value=y,y=h(_,u,b,p);for(let A=0;A!==b;++A)y[A]=t[A];d.clippingState=y,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,u,p,_){const E=m!==null?m.length:0;let f=null;if(E!==0){if(f=c.value,_!==!0||f===null){const d=p+E*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(f===null||f.length<d)&&(f=new Float32Array(d));for(let b=0,y=p;b!==E;++b,y+=4)a.copy(m[b]).applyMatrix4(v,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,f}}class Oa extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new cc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ns(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:Li(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:Ei});r.uniforms.tEquirect.value=t;const a=new je(s,r),o=t.minFilter;return t.minFilter===Hn&&(t.minFilter=Nt),new _a(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Qo=256,Xp=3,qp=20,_c=256,xc=16,Yp=3,$p=new z,Kp=new Be;class Ws{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new _a(1,10,null),this._boxMesh=new je(new ns(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=$p}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);const m=c.autoClear,u=c.autoClearColor,p=c.autoClearDepth,_=c.autoClearStencil,E=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,E===null&&(e.background=c.getClearColor(Kp));const f=new _a(i,s,h);return f.position.copy(o),f.update(c,e),c.autoClear=m,c.autoClearColor=u,c.autoClearDepth=p,c.autoClearStencil=_,e.background=E,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Qo,_u(e))}_fromTexture(e,t){e.mapping===Ri||e.mapping===Yi?this._setSize(e.image.length===0?Qo:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=jo(e,!1,!1),i=Math.log2(e)-Xp;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=jo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ri||e.mapping===Yi?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=el()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Zp(),this._integrationMaterial=Jp());const t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/xc);for(let a=0;a<=i;a++){const o=Ws.lodToRoughness(a,i);if(a>i-Yp)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(_c*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Qp());const i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}}function jo(n,e,t){return new Oa(n,{minFilter:Hn,generateMipmaps:e,type:pn,colorSpace:Zi,depthBuffer:t})}function ss(n,e,t){return new Xn({name:n,uniforms:e,vertexShader:Oe.cube_vert,fragmentShader:t,side:Ut,blending:Ei,depthTest:!1,depthWrite:!1})}function Zp(){return ss("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${_c}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Jp(){return ss("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xc}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qp(){return ss("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${qp}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function el(){return ss("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tl(){return ss("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function jp(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===js||p===er)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const E=new Oa(_.height);return E.fromEquirectangularTexture(n,u),e.set(u,E),u.addEventListener("dispose",l),o(E.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const p=u.mapping,_=p===js||p===er,E=p===Ri||p===Yi;if(_||E){let f=t.get(u);const d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new Ws(n)),f=_?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const v=u.image;return _&&v&&v.height>0||E&&v&&c(v)?(i===null&&(i=new Ws(n)),f=_?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,p){return p===js?u.mapping=Ri:p===er&&(u.mapping=Yi),u}function c(u){let p=0;const _=6;for(let E=0;E<_;E++)u[E]!==void 0&&p++;return p===_}function l(u){const p=u.target;p.removeEventListener("dispose",l);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function em(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Fs("WebGLRenderer: "+i+" extension not supported."),s}}}function tm(n,e,t,i){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){c(_.target)}function c(_){_.index!==null&&e.remove(_.index);for(const f in _.attributes)e.remove(_.attributes[f]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const E=r.get(_);E&&(e.remove(E),r.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function l(_,E){return s[E.id]!==void 0||(E.addEventListener("dispose",o),s[E.id]=new WeakRef(E),a.register(E,E.id,E),t.memory.geometries++),E}function h(_){const E=_.attributes;for(const f in E)e.update(E[f],n.ARRAY_BUFFER)}function m(_){const E=_.index,f=_.attributes.position;let d=0;if(f===void 0)return;const v=E!==null?E.array.length:f.array.length/3-1,b=f.count>=65535?oc:ac,y=new b(Math.ceil(v/3)*6,1),A=y.array;if(E!==null){const g=E.array;d=E.version;for(let M=0,I=0;M<v;M+=3){const P=g[M+0],R=g[M+1],U=g[M+2];A[I++]=P,A[I++]=R,A[I++]=R,A[I++]=U,A[I++]=U,A[I++]=P}}else{d=f.version;for(let g=0,M=0;g<v;g+=3){const I=g+0,P=g+1,R=g+2;A[M++]=I,A[M++]=P,A[M++]=P,A[M++]=R,A[M++]=R,A[M++]=I}}y.version=d;const w=r.get(_);w&&e.remove(w),r.set(_,y)}function u(_){const E=r.get(_);if(E){const f=_.index;f!==null&&E.version<f.version&&m(_)}else m(_);return r.get(_)}function p(){for(const _ in s){const E=s[_].deref();E!==void 0&&c(E)}}return{get:l,update:h,getWireframeAttribute:u,dispose:p}}function nm(n,e,t){let i;function s(m){i=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function c(m,u){n.drawElements(i,u,r,m*a),t.update(u,i,1)}function l(m,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,m*a,p),t.update(u,i,p))}function h(m,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,m,0,p);let E=0;for(let f=0;f<p;f++)E+=u[f];t.update(E,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function im(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function sm(n,e,t){const i=new WeakMap,s=new lt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==m){let P=function(){M.dispose(),i.delete(o),o.removeEventListener("dispose",P)};var p=P;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),E===!0&&(y=2),f===!0&&(y=3);let A=o.attributes.position.count*y,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const g=new Float32Array(A*w*4*m),M=new nc(g,A,w,m);M.type=un,M.needsUpdate=!0;const I=y*4;for(let R=0;R<m;R++){const U=d[R],V=v[R],D=b[R],G=A*w*4*R;for(let Y=0;Y<U.count;Y++){const k=Y*I;_===!0&&(s.fromBufferAttribute(U,Y),g[G+k+0]=s.x,g[G+k+1]=s.y,g[G+k+2]=s.z,g[G+k+3]=0),E===!0&&(s.fromBufferAttribute(V,Y),g[G+k+4]=s.x,g[G+k+5]=s.y,g[G+k+6]=s.z,g[G+k+7]=0),f===!0&&(s.fromBufferAttribute(D,Y),g[G+k+8]=s.x,g[G+k+9]=s.y,g[G+k+10]=s.z,g[G+k+11]=D.itemSize===4?s.w:1)}}u={count:m,texture:M,size:new ze(A,w)},i.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let _=0;for(let f=0;f<l.length;f++)_+=l[f];const E=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",E),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function rm(n,e,t,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,m=l.geometry,u=e.get(l,m);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const am={[Ol]:"LINEAR_TONE_MAPPING",[Bl]:"REINHARD_TONE_MAPPING",[zl]:"CINEON_TONE_MAPPING",[kl]:"ACES_FILMIC_TONE_MAPPING",[Hl]:"AGX_TONE_MAPPING",[Vl]:"NEUTRAL_TONE_MAPPING",[Gl]:"CUSTOM_TONE_MAPPING"};function om(n,e,t,i,s,r){const a=new rn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const h=new Ft;h.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new et([0,2,0,0,2,0],2));const m=new $u({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new je(h,m),p=new Fa(-1,1,1,-1,0,1);let _=null,E=null,f=!1,d,v=null,b=[],y=!1;this.setSize=function(A,w){a.setSize(A,w),o!==null&&o.setSize(A,w),c!==null&&c.setSize(A,w);for(let g=0;g<b.length;g++){const M=b[g];M.setSize&&M.setSize(A,w)}},this.setEffects=function(A){b=A,y=b.length>0&&b[0].isRenderPass===!0;const w=a.width,g=a.height;b.length>0&&o===null&&(o=new rn(w,g,{type:pn,depthBuffer:!1,stencilBuffer:!1}),c=new rn(w,g,{type:pn,depthBuffer:!1,stencilBuffer:!1}));const M=s===!0&&b.some(I=>I.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&l===null&&(l=new Pi(w,g),r===!0&&(l.format=Vn,l.type=Ci)),a.dispose(),a.depthTexture=M?l:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let I=0;I<b.length;I++){const P=b[I];P.setSize&&P.setSize(w,g),M&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(A,w){if(f||A.toneMapping===wn&&b.length===0)return!1;if(v=w,w!==null){const g=w.width,M=w.height;(a.width!==g||a.height!==M)&&this.setSize(g,M)}return y===!1&&A.setRenderTarget(a),d=A.toneMapping,A.toneMapping=wn,!0},this.hasRenderPass=function(){return y},this.end=function(A,w){A.toneMapping=d,f=!0;let g=a,M=o;for(let I=0;I<b.length;I++){const P=b[I];P.enabled!==!1&&(P.render(A,M,g,w),P.needsSwap!==!1&&(g=M,M=M===o?c:o))}if(_!==A.outputColorSpace||E!==A.toneMapping){_=A.outputColorSpace,E=A.toneMapping,m.defines={},Ve.getTransfer(_)===Ze&&(m.defines.SRGB_TRANSFER="");const I=am[E];I&&(m.defines[I]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=g.texture,A.setRenderTarget(v),A.render(u,p),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),m.dispose()}}const vc=new Rt,Sc=new Pi(1,1),Mc=new hc(1),yc=new nc,Ec=new Tu,bc=new cc,nl=[],il=[],sl=new Float32Array(16),rl=new Float32Array(9),al=new Float32Array(4);function Ii(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=nl[s];if(r===void 0&&(r=new Float32Array(s),nl[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $s(n,e){let t=il[e];t===void 0&&(t=new Int32Array(e),il[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function lm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function dm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;al.set(i),n.uniformMatrix2fv(this.addr,!1,al),mt(t,i)}}function fm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;rl.set(i),n.uniformMatrix3fv(this.addr,!1,rl),mt(t,i)}}function pm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;sl.set(i),n.uniformMatrix4fv(this.addr,!1,sl),mt(t,i)}}function mm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function _m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function vm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function Mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function Ks(n){return n.version===0&&(n.compareFunction=ec,n.needsUpdate=!0),n}function Em(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=Ks(Sc):r=vc,t.setTexture2D(e||r,s)}function bm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ec,s)}function Tm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=Ks(Mc):r=bc,t.setTextureCube(e||r,s)}function wm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||yc,s)}function Am(n){switch(n){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return fm;case 35676:return pm;case 5124:case 35670:return mm;case 35667:case 35671:return gm;case 35668:case 35672:return _m;case 35669:case 35673:return xm;case 5125:return vm;case 36294:return Sm;case 36295:return Mm;case 36296:return ym;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return bm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return wm}}function Rm(n,e){n.uniform1fv(this.addr,e)}function Cm(n,e){const t=Ii(e,this.size,2);n.uniform2fv(this.addr,t)}function Pm(n,e){const t=Ii(e,this.size,3);n.uniform3fv(this.addr,t)}function Lm(n,e){const t=Ii(e,this.size,4);n.uniform4fv(this.addr,t)}function Dm(n,e){const t=Ii(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Im(n,e){const t=Ii(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Nm(n,e){const t=Ii(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Um(n,e){n.uniform1iv(this.addr,e)}function Fm(n,e){n.uniform2iv(this.addr,e)}function Om(n,e){n.uniform3iv(this.addr,e)}function Bm(n,e){n.uniform4iv(this.addr,e)}function zm(n,e){n.uniform1uiv(this.addr,e)}function km(n,e){n.uniform2uiv(this.addr,e)}function Gm(n,e){n.uniform3uiv(this.addr,e)}function Hm(n,e){n.uniform4uiv(this.addr,e)}function Vm(n,e,t){const i=this.cache,s=e.length,r=$s(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ks(Sc):a=vc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Wm(n,e,t){const i=this.cache,s=e.length,r=$s(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ec,r[a])}function Xm(n,e,t){const i=this.cache,s=e.length,r=$s(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=Ks(Mc):a=bc;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function qm(n,e,t){const i=this.cache,s=e.length,r=$s(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||yc,r[a])}function Ym(n){switch(n){case 5126:return Rm;case 35664:return Cm;case 35665:return Pm;case 35666:return Lm;case 35674:return Dm;case 35675:return Im;case 35676:return Nm;case 5124:case 35670:return Um;case 35667:case 35671:return Fm;case 35668:case 35672:return Om;case 35669:case 35673:return Bm;case 5125:return zm;case 36294:return km;case 36295:return Gm;case 36296:return Hm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return qm}}class $m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Am(t.type)}}class Km{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ym(t.type)}}class Zm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const wr=/(\w+)(\])?(\[|\.)?/g;function ol(n,e){n.seq.push(e),n.map[e.id]=e}function Jm(n,e,t){const i=n.name,s=i.length;for(wr.lastIndex=0;;){const r=wr.exec(i),a=wr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ol(t,l===void 0?new $m(o,n,e):new Km(o,n,e));break}else{let m=t.map[o];m===void 0&&(m=new Zm(o),ol(t,m)),t=m}}}class Os{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Jm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function ll(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Qm=37297;let jm=0;function eg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const cl=new Ne;function tg(n){Ve._getMatrix(cl,Ve.workingColorSpace,n);const e=`mat3( ${cl.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(n)){case Hs:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function hl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+eg(n.getShaderSource(e),o)}else return r}function ng(n,e){const t=tg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const ig={[Ol]:"Linear",[Bl]:"Reinhard",[zl]:"Cineon",[kl]:"ACESFilmic",[Hl]:"AgX",[Vl]:"Neutral",[Gl]:"Custom"};function sg(n,e){const t=ig[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Cs=new z;function rg(){Ve.getLuminanceCoefficients(Cs);const n=Cs.x.toFixed(4),e=Cs.y.toFixed(4),t=Cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ag(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gi).join(`
`)}function og(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Gi(n){return n!==""}function ul(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function xa(n){return n.replace(cg,hg)}function hg(n,e){const t=Oe[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return xa(t)}const ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(n){return n.replace(ug,dg)}function dg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const fg={[Ls]:"SHADOWMAP_TYPE_PCF",[ki]:"SHADOWMAP_TYPE_VSM"};function pg(n){return fg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mg={[Yi]:"ENVMAP_MODE_REFRACTION"};function gg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":mg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const _g={[Ea]:"ENVMAP_BLENDING_MULTIPLY",[eu]:"ENVMAP_BLENDING_MIX",[tu]:"ENVMAP_BLENDING_ADD"};function xg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":_g[n.combine]||"ENVMAP_BLENDING_NONE"}function vg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=pg(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=gg(t),m=xg(t),u=ag(t),p=og(r),_=s.createProgram();let E,f,d=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(E=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Gi).join(`
`),E.length>0&&(E+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Gi).join(`
`),f.length>0&&(f+=`
`)):(E=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gi).join(`
`),f=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==wn?sg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,ng("linearToOutputTexel",t.outputColorSpace),rg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gi).join(`
`)),a=xa(a),a=ul(a,t),a=dl(a,t),o=xa(o),o=ul(o,t),o=dl(o,t),a=fl(a),o=fl(o),t.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,E=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,f=["#define varying in",t.glslVersion===Ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=d+E+a,b=d+f+o,y=ll(s,s.VERTEX_SHADER,v),A=ll(s,s.FRAGMENT_SHADER,b);s.attachShader(_,y),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(P){if(n.debug.checkShaderErrors){const R=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(y)||"",V=s.getShaderInfoLog(A)||"",D=R.trim(),G=U.trim(),Y=V.trim();let k=!0,te=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,y,A);else{const X=hl(s,y,"vertex"),Q=hl(s,A,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+D+`
`+X+`
`+Q)}else D!==""?Ce("WebGLProgram: Program Info Log:",D):(G===""||Y==="")&&(te=!1);te&&(P.diagnostics={runnable:k,programLog:D,vertexShader:{log:G,prefix:E},fragmentShader:{log:Y,prefix:f}})}s.deleteShader(y),s.deleteShader(A),g=new Os(s,_),M=lg(s,_)}let g;this.getUniforms=function(){return g===void 0&&w(this),g};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,Qm)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=A,this}let Sg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new yg(e),t.set(e,i)),i}}class yg{constructor(e){this.id=Sg++,this.code=e,this.usedTimes=0}}function Eg(n){return n===ni||n===ks||n===Gs}function bg(n,e,t,i,s,r){const a=new ic,o=new Mg,c=new Set,l=[],h=new Map,m=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(g){return c.add(g),g===0?"uv":`uv${g}`}function _(g,M,I,P,R,U){const V=P.fog,D=R.geometry,G=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?P.environment:null,Y=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,k=e.get(g.envMap||G,Y),te=u[g.type];let X=i.precision;g.precision!==null&&(X=i.getMaxPrecision(g.precision),X!==g.precision&&Ce("WebGLProgram.getParameters:",g.precision,"not supported, using",X,"instead."));const Q=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,j=Q!==void 0?Q.length:0;let ye=0;D.morphAttributes.position!==void 0&&(ye=1),D.morphAttributes.normal!==void 0&&(ye=2),D.morphAttributes.color!==void 0&&(ye=3);let Le,K,me,ve;if(te){const fe=cn[te];Le=fe.vertexShader,K=fe.fragmentShader}else{Le=g.vertexShader,K=g.fragmentShader;const fe=o.getVertexShaderStage(g),Ke=o.getFragmentShaderStage(g);o.update(g,fe,Ke),me=fe.id,ve=Ke.id}const we=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),Ie=R.isInstancedMesh===!0,ct=R.isBatchedMesh===!0,Re=!!g.map,$e=!!g.matcap,Je=!!k,ke=Je&&k.isPMREMTexture===!0,St=!!g.aoMap,dt=!!g.lightMap,Dt=!!g.bumpMap&&g.wireframe===!1,rt=!!g.normalMap,an=!!g.displacementMap,gt=!!g.emissiveMap,kt=!!g.metalnessMap,Gt=!!g.roughnessMap,Ht=g.anisotropy>0,N=g.clearcoat>0,Vt=g.diffuseRoughness>0,nt=g.dispersion>0,it=g.retroreflectivity>0,de=g.iridescence>0,ft=g.sheen>0,Ae=g.transmission>0,Pe=Ht&&!!g.anisotropyMap,T=N&&!!g.clearcoatMap,x=N&&!!g.clearcoatNormalMap,O=N&&!!g.clearcoatRoughnessMap,ee=Vt&&!!g.diffuseRoughnessMap,J=de&&!!g.iridescenceMap,se=de&&!!g.iridescenceThicknessMap,ce=ft&&!!g.sheenColorMap,q=ft&&!!g.sheenRoughnessMap,$=!!g.specularMap,ae=!!g.specularColorMap,C=!!g.specularIntensityMap,Z=Ae&&!!g.transmissionMap,W=Ae&&!!g.thicknessMap,oe=!!g.gradientMap,ie=!!g.alphaMap,re=g.alphaTest>0,be=!!g.alphaHash,Fe=!!g.extensions;let ne=wn;g.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(ne=n.toneMapping);const Te=ke?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,Ue={shaderID:te,shaderType:g.type,shaderName:g.name,vertexShader:Le,fragmentShader:K,defines:g.defines,customVertexShaderID:me,customFragmentShaderID:ve,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:X,batching:ct,batchingColor:ct&&R._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&R.instanceColor!==null,instancingMorph:Ie&&R.morphTexture!==null,outputColorSpace:we===null?n.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:Ve.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Re,matcap:$e,envMap:Je,envMapMode:Je&&k.mapping,envMapPMREM:ke,envMapMaxLod:ke?Te.length-1:null,envMapSize:ke?Te[0].width:null,aoMap:St,lightMap:dt,bumpMap:Dt,normalMap:rt,displacementMap:an,emissiveMap:gt,normalMapObjectSpace:rt&&g.normalMapType===su,normalMapTangentSpace:rt&&g.normalMapType===ma,packedNormalMap:rt&&g.normalMapType===ma&&Eg(g.normalMap.format),metalnessMap:kt,roughnessMap:Gt,anisotropy:Ht,anisotropyMap:Pe,clearcoat:N,clearcoatMap:T,clearcoatNormalMap:x,clearcoatRoughnessMap:O,diffuseRoughness:Vt,diffuseRoughnessMap:ee,dispersion:nt,retroreflection:it,iridescence:de,iridescenceMap:J,iridescenceThicknessMap:se,sheen:ft,sheenColorMap:ce,sheenRoughnessMap:q,specularMap:$,specularColorMap:ae,specularIntensityMap:C,transmission:Ae,transmissionMap:Z,thicknessMap:W,gradientMap:oe,opaque:g.transparent===!1&&g.blending===Vi&&g.alphaToCoverage===!1,alphaMap:ie,alphaTest:re,alphaHash:be,combine:g.combine,mapUv:Re&&p(g.map.channel),aoMapUv:St&&p(g.aoMap.channel),lightMapUv:dt&&p(g.lightMap.channel),bumpMapUv:Dt&&p(g.bumpMap.channel),normalMapUv:rt&&p(g.normalMap.channel),displacementMapUv:an&&p(g.displacementMap.channel),emissiveMapUv:gt&&p(g.emissiveMap.channel),metalnessMapUv:kt&&p(g.metalnessMap.channel),roughnessMapUv:Gt&&p(g.roughnessMap.channel),anisotropyMapUv:Pe&&p(g.anisotropyMap.channel),clearcoatMapUv:T&&p(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&p(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:O&&p(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ee&&p(g.diffuseRoughnessMap.channel),iridescenceMapUv:J&&p(g.iridescenceMap.channel),iridescenceThicknessMapUv:se&&p(g.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&p(g.sheenColorMap.channel),sheenRoughnessMapUv:q&&p(g.sheenRoughnessMap.channel),specularMapUv:$&&p(g.specularMap.channel),specularColorMapUv:ae&&p(g.specularColorMap.channel),specularIntensityMapUv:C&&p(g.specularIntensityMap.channel),transmissionMapUv:Z&&p(g.transmissionMap.channel),thicknessMapUv:W&&p(g.thicknessMap.channel),alphaMapUv:ie&&p(g.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(rt||Ht),vertexNormals:!!D.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!D.attributes.uv&&(Re||ie),fog:!!V,useFog:g.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||D.attributes.normal===void 0&&rt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:ge,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ye,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:U.filter(fe=>fe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ne,decodeVideoTexture:Re&&g.map.isVideoTexture===!0&&Ve.getTransfer(g.map.colorSpace)===Ze,decodeVideoTextureEmissive:gt&&g.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(g.emissiveMap.colorSpace)===Ze,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===hn,flipSided:g.side===Ut,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Fe&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&g.extensions.multiDraw===!0||ct)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function E(g){const M=[];if(g.shaderID?M.push(g.shaderID):(M.push(g.customVertexShaderID),M.push(g.customFragmentShaderID)),g.defines!==void 0)for(const I in g.defines)M.push(I),M.push(g.defines[I]);return g.isRawShaderMaterial===!1&&(f(M,g),d(M,g),M.push(n.outputColorSpace)),M.push(g.customProgramCacheKey),M.join()}function f(g,M){g.push(M.precision),g.push(M.outputColorSpace),g.push(M.envMapMode),g.push(M.envMapPMREM),g.push(M.envMapMaxLod),g.push(M.envMapSize),g.push(M.mapUv),g.push(M.alphaMapUv),g.push(M.lightMapUv),g.push(M.aoMapUv),g.push(M.bumpMapUv),g.push(M.normalMapUv),g.push(M.displacementMapUv),g.push(M.emissiveMapUv),g.push(M.metalnessMapUv),g.push(M.roughnessMapUv),g.push(M.anisotropyMapUv),g.push(M.clearcoatMapUv),g.push(M.clearcoatNormalMapUv),g.push(M.clearcoatRoughnessMapUv),g.push(M.diffuseRoughnessMapUv),g.push(M.iridescenceMapUv),g.push(M.iridescenceThicknessMapUv),g.push(M.sheenColorMapUv),g.push(M.sheenRoughnessMapUv),g.push(M.specularMapUv),g.push(M.specularColorMapUv),g.push(M.specularIntensityMapUv),g.push(M.transmissionMapUv),g.push(M.thicknessMapUv),g.push(M.combine),g.push(M.fogExp2),g.push(M.sizeAttenuation),g.push(M.morphTargetsCount),g.push(M.numSunLights),g.push(M.numDirLights),g.push(M.numPointLights),g.push(M.numSpotLights),g.push(M.numSpotLightMaps),g.push(M.numHemiLights),g.push(M.numRectAreaLights),g.push(M.numSunLightShadows),g.push(M.numDirLightShadows),g.push(M.numPointLightShadows),g.push(M.numSpotLightShadows),g.push(M.numSpotLightShadowsWithMaps),g.push(M.numLightProbes),g.push(M.numLightProbeGrids),g.push(M.shadowMapType),g.push(M.toneMapping),g.push(M.numClippingPlanes),g.push(M.numClipIntersection),g.push(M.depthPacking)}function d(g,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function v(g){const M=u[g.type];let I;if(M){const P=cn[M];I=Xu.clone(P.uniforms)}else I=g.uniforms;return I}function b(g,M){let I=h.get(M);return I!==void 0?++I.usedTimes:(I=new vg(n,M,g,s),l.push(I),h.set(M,I)),I}function y(g){if(--g.usedTimes===0){const M=l.indexOf(g);l[M]=l[l.length-1],l.pop(),h.delete(g.cacheKey),g.destroy()}}function A(g){o.remove(g)}function w(){o.dispose()}return{getParameters:_,getProgramCacheKey:E,getUniforms:v,acquireProgram:b,releaseProgram:y,releaseShaderCache:A,programs:l,dispose:w}}function Tg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function wg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ml(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,_,E,f,d){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:_,materialVariant:a(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:d},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=_,v.materialVariant=a(u),v.groupOrder=E,v.renderOrder=u.renderOrder,v.z=f,v.group=d),e++,v}function c(u,p,_,E,f,d,v){v.reversedDepth===!0&&(f=-f);const b=o(u,p,_,E,f,d);_.transmission>0?i.push(b):_.transparent===!0?s.push(b):t.push(b)}function l(u,p,_,E,f,d){const v=o(u,p,_,E,f,d);_.transmission>0?i.unshift(v):_.transparent===!0?s.unshift(v):t.unshift(v)}function h(u,p){t.length>1&&t.sort(u||wg),i.length>1&&i.sort(p||ml),s.length>1&&s.sort(p||ml)}function m(){for(let u=e,p=n.length;u<p;u++){const _=n[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:m,sort:h}}function Ag(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new gl,n.set(i,[a])):s>=r.length?(a=new gl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Rg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new Be};break;case"SpotLight":t={position:new z,direction:new z,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function Cg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Pg=0;function Lg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Dg(n){const e=new Rg,t=Cg(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new z);const s=new z,r=new st,a=new st;function o(l){let h=0,m=0,u=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let p=0,_=0,E=0,f=0,d=0,v=0,b=0,y=0,A=0,w=0,g=0,M=0,I=0,P=0;l.sort(Lg);for(let U=0,V=l.length;U<V;U++){const D=l[U],G=D.color,Y=D.intensity,k=D.distance;let te=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ni?te=D.shadow.map.texture:te=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=G.r*Y,m+=G.g*Y,u+=G.b*Y;else if(D.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(D.sh.coefficients[X],Y);P++}else if(D.isSunLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,j=t.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[_]=j,i.sunShadowMap[_]=te;const ye=Q.getViewportCount();for(let Le=0;Le<ye;Le++)i.sunShadowMatrix[E+Le]=Q.getMatrix(Le),i.sunShadowCascade[E+Le]=Q._cascadeData[Le];E+=ye,_++}i.sun[p]=X,p++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,j=t.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.directionalShadow[f]=j,i.directionalShadowMap[f]=te,i.directionalShadowMatrix[f]=D.shadow.matrix,A++}i.directional[f]=X,f++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(G).multiplyScalar(Y),X.distance=k,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,i.spot[v]=X;const Q=D.shadow;if(D.map&&(i.spotLightMap[M]=D.map,M++,Q.updateMatrices(D),D.castShadow&&I++),i.spotLightMatrix[v]=Q.matrix,D.castShadow){const j=t.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.spotShadow[v]=j,i.spotShadowMap[v]=te,g++}v++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(G).multiplyScalar(Y),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),i.rectArea[b]=X,b++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const Q=D.shadow,j=t.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,i.pointShadow[d]=j,i.pointShadowMap[d]=te,i.pointShadowMatrix[d]=D.shadow.matrix,w++}i.point[d]=X,d++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(Y),X.groundColor.copy(D.groundColor).multiplyScalar(Y),i.hemi[y]=X,y++}}b>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=u;const R=i.hash;(R.sunLength!==p||R.directionalLength!==f||R.pointLength!==d||R.spotLength!==v||R.rectAreaLength!==b||R.hemiLength!==y||R.numSunShadows!==_||R.numDirectionalShadows!==A||R.numPointShadows!==w||R.numSpotShadows!==g||R.numSpotMaps!==M||R.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=f,i.spot.length=v,i.rectArea.length=b,i.point.length=d,i.hemi.length=y,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=E,i.sunShadowCascade.length=E,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=g,i.spotShadowMap.length=g,i.spotLightMatrix.length=g+M-I,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=P,R.sunLength=p,R.directionalLength=f,R.pointLength=d,R.spotLength=v,R.rectAreaLength=b,R.hemiLength=y,R.numSunShadows=_,R.numDirectionalShadows=A,R.numPointShadows=w,R.numSpotShadows=g,R.numSpotMaps=M,R.numLightProbes=P,i.version=Pg++)}function c(l,h){let m=0,u=0,p=0,_=0,E=0,f=0;const d=h.matrixWorldInverse;for(let v=0,b=l.length;v<b;v++){const y=l[v];if(y.isSunLight){const A=i.sun[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),m++}else if(y.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),u++}else if(y.isSpotLight){const A=i.spot[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),_++}else if(y.isRectAreaLight){const A=i.rectArea[E];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),a.identity(),r.copy(y.matrixWorld),r.premultiply(d),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),E++}else if(y.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const A=i.hemi[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),f++}}}return{setup:o,setupView:c,state:i}}function _l(n){const e=new Dg(n),t=[],i=[],s=[];function r(m){h.camera=m,t.length=0,i.length=0,s.length=0}function a(m){m.isLightProbeGrid?s.push(m):t.push(m)}function o(m){i.push(m)}function c(){e.setup(t),s.sort((m,u)=>m.priority-u.priority||m.id-u.id)}function l(m){e.setupView(t,m)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Ig(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new _l(n),e.set(s,[o])):r>=a.length?(o=new _l(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Ng=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ug=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Fg=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],Og=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],xl=new st,zi=new z,Ar=new z;function Bg(n,e,t){let i=new Qi;const s=new ze,r=new ze,a=new lt,o=new Ku,c=new Zu,l={},h=t.maxTextureSize,m={[ti]:Ut,[Ut]:ti,[hn]:hn},u=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:Ng,fragmentShader:Ug}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Ft;_.setAttribute("position",new jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new je(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ls;let d=this.type;this.render=function(w,g,M){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;this.type===Uh&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ls);const I=n.getRenderTarget(),P=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Ei),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=d!==this.type;V&&g.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(G=>G.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,G=w.length;D<G;D++){const Y=w[D],k=Y.shadow;if(k===void 0){Ce("WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const te=k.getFrameExtents();s.multiply(te),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,k.mapSize.y=r.y));const X=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=X,k.map===null||V===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ki){if(Y.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new rn(s.x,s.y,{format:ni,type:pn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),k.map.texture.name=Y.name+".shadowMap",k.map.depthTexture=new Pi(s.x,s.y,un),k.map.depthTexture.name=Y.name+".shadowMapDepth",k.map.depthTexture.format=Wn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ot,k.map.depthTexture.magFilter=ot}else Y.isPointLight?(k.map=new Oa(s.x),k.map.depthTexture=new hc(s.x,fn)):(k.map=new rn(s.x,s.y),k.map.depthTexture=new Pi(s.x,s.y,fn)),k.map.depthTexture.name=Y.name+".shadowMap",k.map.depthTexture.format=Wn,this.type===Ls?(k.map.depthTexture.compareFunction=X?jl:Ql,k.map.depthTexture.minFilter=Nt,k.map.depthTexture.magFilter=Nt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ot,k.map.depthTexture.magFilter=ot);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);const Q=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();Y.isPointLight!==!0&&k.updateMatrices(Y,M);const j=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:M.layers;for(let ye=0;ye<Q;ye++){const Le=k.getCamera(ye);if(Y.isPointLight){const K=k.camera,me=k.matrix,ve=Y.distance||K.far;ve!==K.far&&(K.far=ve,K.updateProjectionMatrix()),zi.setFromMatrixPosition(Y.matrixWorld),K.position.copy(zi),Ar.copy(K.position),Ar.add(Fg[ye]),K.up.copy(Og[ye]),K.lookAt(Ar),K.updateMatrixWorld(),me.makeTranslation(-zi.x,-zi.y,-zi.z),xl.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),k._frustum.setFromProjectionMatrix(xl,K.coordinateSystem,K.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,ye),n.clear();else{ye===0&&(n.setRenderTarget(k.map),n.clear());const K=k.getViewport(ye);a.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),U.viewport(a)}i=k.getFrustum(ye),y(g,M,Le,Y,j,this.type)}k.isPointLightShadow!==!0&&this.type===ki&&v(k,M),k.needsUpdate=!1}d=this.type,f.needsUpdate=!1,n.setRenderTarget(I,P,R)};function v(w,g){const M=e.update(E);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new rn(s.x,s.y,{format:ni,type:pn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(g,null,M,u,E,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(g,null,M,p,E,null)}function b(w,g,M,I){let P=null;const R=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)P=R;else if(P=M.isPointLight===!0?c:o,n.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const U=P.uuid,V=g.uuid;let D=l[U];D===void 0&&(D={},l[U]=D);let G=D[V];G===void 0&&(G=P.clone(),D[V]=G,g.addEventListener("dispose",A)),P=G}if(P.visible=g.visible,P.wireframe=g.wireframe,I===ki?P.side=g.shadowSide!==null?g.shadowSide:g.side:P.side=g.shadowSide!==null?g.shadowSide:m[g.side],P.alphaMap=g.alphaMap,P.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,P.map=g.map,P.clipShadows=g.clipShadows,P.clippingPlanes=g.clippingPlanes,P.clipIntersection=g.clipIntersection,P.displacementMap=g.displacementMap,P.displacementScale=g.displacementScale,P.displacementBias=g.displacementBias,P.wireframeLinewidth=g.wireframeLinewidth,P.linewidth=g.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const U=n.properties.get(P);U.light=M}return P}function y(w,g,M,I,P,R){if(w.visible===!1)return;if(w.layers.test(P)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===ki)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);const D=e.update(w),G=w.material;if(Array.isArray(G)){const Y=D.groups;for(let k=0,te=Y.length;k<te;k++){const X=Y[k],Q=G[X.materialIndex];if(Q&&Q.visible){const j=b(w,Q,I,R);w.onBeforeShadow(n,w,g,M,D,j,X),n.renderBufferDirect(M,null,D,j,w,X),w.onAfterShadow(n,w,g,M,D,j,X)}}}else if(G.visible){const Y=b(w,G,I,R);w.onBeforeShadow(n,w,g,M,D,Y,null),n.renderBufferDirect(M,null,D,Y,w,null),w.onAfterShadow(n,w,g,M,D,Y,null)}}const V=w.children;for(let D=0,G=V.length;D<G;D++)y(V[D],g,M,I,P,R)}function A(w){w.target.removeEventListener("dispose",A);for(const M in l){const I=l[M],P=w.target.uuid;P in I&&(I[P].dispose(),delete I[P])}}}function zg(n,e){function t(){let C=!1;const Z=new lt;let W=null;const oe=new lt(0,0,0,0);return{setMask:function(ie){W!==ie&&!C&&(n.colorMask(ie,ie,ie,ie),W=ie)},setLocked:function(ie){C=ie},setClear:function(ie,re,be,Fe,ne){ne===!0&&(ie*=Fe,re*=Fe,be*=Fe),Z.set(ie,re,be,Fe),oe.equals(Z)===!1&&(n.clearColor(ie,re,be,Fe),oe.copy(Z))},reset:function(){C=!1,W=null,oe.set(-1,0,0,0)}}}function i(){let C=!1,Z=!1,W=null,oe=null,ie=null;return{setReversed:function(re){if(Z!==re){const be=e.get("EXT_clip_control");re?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),Z=re;const Fe=ie;ie=null,this.setClear(Fe)}},getReversed:function(){return Z},setTest:function(re){re?ge(n.DEPTH_TEST):Ie(n.DEPTH_TEST)},setMask:function(re){W!==re&&!C&&(n.depthMask(re),W=re)},setFunc:function(re){if(Z&&(re=mu[re]),oe!==re){switch(re){case Lr:n.depthFunc(n.NEVER);break;case Dr:n.depthFunc(n.ALWAYS);break;case Ir:n.depthFunc(n.LESS);break;case qi:n.depthFunc(n.LEQUAL);break;case Nr:n.depthFunc(n.EQUAL);break;case Ur:n.depthFunc(n.GEQUAL);break;case Fr:n.depthFunc(n.GREATER);break;case Or:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}oe=re}},setLocked:function(re){C=re},setClear:function(re){ie!==re&&(ie=re,Z&&(re=1-re),n.clearDepth(re))},reset:function(){C=!1,W=null,oe=null,ie=null,Z=!1}}}function s(){let C=!1,Z=null,W=null,oe=null,ie=null,re=null,be=null,Fe=null,ne=null;return{setTest:function(Te){C||(Te?ge(n.STENCIL_TEST):Ie(n.STENCIL_TEST))},setMask:function(Te){Z!==Te&&!C&&(n.stencilMask(Te),Z=Te)},setFunc:function(Te,Ue,fe){(W!==Te||oe!==Ue||ie!==fe)&&(n.stencilFunc(Te,Ue,fe),W=Te,oe=Ue,ie=fe)},setOp:function(Te,Ue,fe){(re!==Te||be!==Ue||Fe!==fe)&&(n.stencilOp(Te,Ue,fe),re=Te,be=Ue,Fe=fe)},setLocked:function(Te){C=Te},setClear:function(Te){ne!==Te&&(n.clearStencil(Te),ne=Te)},reset:function(){C=!1,Z=null,W=null,oe=null,ie=null,re=null,be=null,Fe=null,ne=null}}}const r=new t,a=new i,o=new s;let c={};const l=new WeakMap;let h={},m={},u={},p=new WeakMap,_=[],E=null,f=!1,d=null,v=null,b=null,y=null,A=null,w=null,g=null,M=new Be(0,0,0),I=0,P=!1,R=null,U=null,V=null,D=null,G=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,te=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=te>=1):X.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=te>=2);let Q=null,j={};const ye=n.getParameter(n.SCISSOR_BOX),Le=n.getParameter(n.VIEWPORT),K=new lt().fromArray(ye),me=new lt().fromArray(Le);function ve(C,Z,W,oe){const ie=new Uint8Array(4),re=n.createTexture();n.bindTexture(C,re),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<W;be++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(Z,0,n.RGBA,1,1,oe,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(Z+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return re}const we={};we[n.TEXTURE_2D]=ve(n.TEXTURE_2D,n.TEXTURE_2D,1),we[n.TEXTURE_CUBE_MAP]=ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[n.TEXTURE_2D_ARRAY]=ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),we[n.TEXTURE_3D]=ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ge(n.DEPTH_TEST),a.setFunc(qi),Dt(!1),rt(bo),ge(n.CULL_FACE),St(Ei);function ge(C){h[C]!==!0&&(n.enable(C),h[C]=!0)}function Ie(C){h[C]!==!1&&(n.disable(C),h[C]=!1)}function ct(C,Z){return u[C]!==Z?(n.bindFramebuffer(C,Z),u[C]=Z,C===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Z),C===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Z),!0):!1}function Re(C,Z){let W=_,oe=!1;if(C){W=p.get(Z),W===void 0&&(W=[],p.set(Z,W));const ie=C.textures;if(W.length!==ie.length||W[0]!==n.COLOR_ATTACHMENT0){for(let re=0,be=ie.length;re<be;re++)W[re]=n.COLOR_ATTACHMENT0+re;W.length=ie.length,oe=!0}}else W[0]!==n.BACK&&(W[0]=n.BACK,oe=!0);oe&&n.drawBuffers(W)}function $e(C){return E!==C?(n.useProgram(C),E=C,!0):!1}const Je={[yi]:n.FUNC_ADD,[Oh]:n.FUNC_SUBTRACT,[Bh]:n.FUNC_REVERSE_SUBTRACT};Je[zh]=n.MIN,Je[kh]=n.MAX;const ke={[Gh]:n.ZERO,[Hh]:n.ONE,[Vh]:n.SRC_COLOR,[Ul]:n.SRC_ALPHA,[Kh]:n.SRC_ALPHA_SATURATE,[Yh]:n.DST_COLOR,[Xh]:n.DST_ALPHA,[Wh]:n.ONE_MINUS_SRC_COLOR,[Fl]:n.ONE_MINUS_SRC_ALPHA,[$h]:n.ONE_MINUS_DST_COLOR,[qh]:n.ONE_MINUS_DST_ALPHA,[Zh]:n.CONSTANT_COLOR,[Jh]:n.ONE_MINUS_CONSTANT_COLOR,[Qh]:n.CONSTANT_ALPHA,[jh]:n.ONE_MINUS_CONSTANT_ALPHA};function St(C,Z,W,oe,ie,re,be,Fe,ne,Te){if(C===Ei){f===!0&&(Ie(n.BLEND),f=!1);return}if(f===!1&&(ge(n.BLEND),f=!0),C!==Fh){if(C!==d||Te!==P){if((v!==yi||A!==yi)&&(n.blendEquation(n.FUNC_ADD),v=yi,A=yi),Te)switch(C){case Vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case To:n.blendFunc(n.ONE,n.ONE);break;case wo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ao:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ye("WebGLState: Invalid blending: ",C);break}else switch(C){case Vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case To:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case wo:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ao:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",C);break}b=null,y=null,w=null,g=null,M.set(0,0,0),I=0,d=C,P=Te}return}ie=ie||Z,re=re||W,be=be||oe,(Z!==v||ie!==A)&&(n.blendEquationSeparate(Je[Z],Je[ie]),v=Z,A=ie),(W!==b||oe!==y||re!==w||be!==g)&&(n.blendFuncSeparate(ke[W],ke[oe],ke[re],ke[be]),b=W,y=oe,w=re,g=be),(Fe.equals(M)===!1||ne!==I)&&(n.blendColor(Fe.r,Fe.g,Fe.b,ne),M.copy(Fe),I=ne),d=C,P=!1}function dt(C,Z){C.side===hn?Ie(n.CULL_FACE):ge(n.CULL_FACE);let W=C.side===Ut;Z&&(W=!W),Dt(W),C.blending===Vi&&C.transparent===!1?St(Ei):St(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const oe=C.stencilWrite;o.setTest(oe),oe&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),gt(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ge(n.SAMPLE_ALPHA_TO_COVERAGE):Ie(n.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(C){R!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),R=C)}function rt(C){C!==Ih?(ge(n.CULL_FACE),C!==U&&(C===bo?n.cullFace(n.BACK):C===Nh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ie(n.CULL_FACE),U=C}function an(C){C!==V&&(k&&n.lineWidth(C),V=C)}function gt(C,Z,W){C?(ge(n.POLYGON_OFFSET_FILL),(D!==Z||G!==W)&&(D=Z,G=W,a.getReversed()&&(Z=-Z,W=-W),n.polygonOffset(Z,W))):Ie(n.POLYGON_OFFSET_FILL)}function kt(C){C?ge(n.SCISSOR_TEST):Ie(n.SCISSOR_TEST)}function Gt(C){C===void 0&&(C=n.TEXTURE0+Y-1),Q!==C&&(n.activeTexture(C),Q=C)}function Ht(C,Z,W){W===void 0&&(Q===null?W=n.TEXTURE0+Y-1:W=Q);let oe=j[W];oe===void 0&&(oe={type:void 0,texture:void 0},j[W]=oe),(oe.type!==C||oe.texture!==Z)&&(Q!==W&&(n.activeTexture(W),Q=W),n.bindTexture(C,Z||we[C]),oe.type=C,oe.texture=Z)}function N(){const C=j[Q];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Vt(){try{n.compressedTexImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function nt(){try{n.compressedTexImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function it(){try{n.texSubImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function de(){try{n.texSubImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function ft(){try{n.compressedTexSubImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function Pe(){try{n.texStorage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function T(){try{n.texStorage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function x(){try{n.texImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function O(){try{n.texImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function ee(C){return m[C]!==void 0?m[C]:n.getParameter(C)}function J(C,Z){m[C]!==Z&&(n.pixelStorei(C,Z),m[C]=Z)}function se(C){K.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),K.copy(C))}function ce(C){me.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),me.copy(C))}function q(C,Z){let W=l.get(Z);W===void 0&&(W=new WeakMap,l.set(Z,W));let oe=W.get(C);oe===void 0&&(oe=n.getUniformBlockIndex(Z,C.name),n.uniformBlockBinding(Z,oe,oe),W.set(C,oe))}function $(C,Z,W){const ie=l.get(Z).get(C);c[ie]!==W&&(n.bindBufferBase(n.UNIFORM_BUFFER,ie,W),c[ie]=W)}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},m={},Q=null,j={},u={},c={},p=new WeakMap,_=[],E=null,f=!1,d=null,v=null,b=null,y=null,A=null,w=null,g=null,M=new Be(0,0,0),I=0,P=!1,R=null,U=null,V=null,D=null,G=null,K.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ge,disable:Ie,bindFramebuffer:ct,drawBuffers:Re,useProgram:$e,setBlending:St,setMaterial:dt,setFlipSided:Dt,setCullFace:rt,setLineWidth:an,setPolygonOffset:gt,setScissorTest:kt,activeTexture:Gt,bindTexture:Ht,unbindTexture:N,compressedTexImage2D:Vt,compressedTexImage3D:nt,texImage2D:x,texImage3D:O,pixelStorei:J,getParameter:ee,updateUBOMapping:q,uniformBlockBinding:$,texStorage2D:Pe,texStorage3D:T,texSubImage2D:it,texSubImage3D:de,compressedTexSubImage2D:ft,compressedTexSubImage3D:Ae,scissor:se,viewport:ce,reset:ae}}function kg(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap,m=new Set;let u;const p=new WeakMap,_=new Set,E=new FinalizationRegistry(T=>_.delete(T));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(T,x){return f?new OffscreenCanvas(T,x):Vs("canvas")}function v(T,x,O){let ee=1;const J=Pe(T);if((J.width>O||J.height>O)&&(ee=O/Math.max(J.width,J.height)),ee<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const se=Math.floor(ee*J.width),ce=Math.floor(ee*J.height);u===void 0&&(u=d(se,ce));const q=x?d(se,ce):u;return q.width=se,q.height=ce,q.getContext("2d").drawImage(T,0,0,se,ce),Ce("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+se+"x"+ce+")."),q}else return"data"in T&&Ce("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function b(T){return T.generateMipmaps}function y(T){n.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(T,x,O,ee,J,se=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ce;ee&&(ce=e.get("EXT_texture_norm16"),ce||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=x;if(x===n.RED&&(O===n.FLOAT&&(q=n.R32F),O===n.HALF_FLOAT&&(q=n.R16F),O===n.UNSIGNED_BYTE&&(q=n.R8),O===n.UNSIGNED_SHORT&&ce&&(q=ce.R16_EXT),O===n.SHORT&&ce&&(q=ce.R16_SNORM_EXT)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.R8UI),O===n.UNSIGNED_SHORT&&(q=n.R16UI),O===n.UNSIGNED_INT&&(q=n.R32UI),O===n.BYTE&&(q=n.R8I),O===n.SHORT&&(q=n.R16I),O===n.INT&&(q=n.R32I)),x===n.RG&&(O===n.FLOAT&&(q=n.RG32F),O===n.HALF_FLOAT&&(q=n.RG16F),O===n.UNSIGNED_BYTE&&(q=n.RG8),O===n.UNSIGNED_SHORT&&ce&&(q=ce.RG16_EXT),O===n.SHORT&&ce&&(q=ce.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RG8UI),O===n.UNSIGNED_SHORT&&(q=n.RG16UI),O===n.UNSIGNED_INT&&(q=n.RG32UI),O===n.BYTE&&(q=n.RG8I),O===n.SHORT&&(q=n.RG16I),O===n.INT&&(q=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RGB8UI),O===n.UNSIGNED_SHORT&&(q=n.RGB16UI),O===n.UNSIGNED_INT&&(q=n.RGB32UI),O===n.BYTE&&(q=n.RGB8I),O===n.SHORT&&(q=n.RGB16I),O===n.INT&&(q=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),O===n.UNSIGNED_INT&&(q=n.RGBA32UI),O===n.BYTE&&(q=n.RGBA8I),O===n.SHORT&&(q=n.RGBA16I),O===n.INT&&(q=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_SHORT&&ce&&(q=ce.RGB16_EXT),O===n.SHORT&&ce&&(q=ce.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),x===n.RGBA){const $=se?Hs:Ve.getTransfer(J);O===n.FLOAT&&(q=n.RGBA32F),O===n.HALF_FLOAT&&(q=n.RGBA16F),O===n.UNSIGNED_BYTE&&(q=$===Ze?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&ce&&(q=ce.RGBA16_EXT),O===n.SHORT&&ce&&(q=ce.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function g(T,x){let O;return T?x===null||x===fn||x===Ci?O=n.DEPTH24_STENCIL8:x===un?O=n.DEPTH32F_STENCIL8:x===Ki&&(O=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===fn||x===Ci?O=n.DEPTH_COMPONENT24:x===un?O=n.DEPTH_COMPONENT32F:x===Ki&&(O=n.DEPTH_COMPONENT16),O}function M(T,x){return b(T)===!0||T.isFramebufferTexture&&T.minFilter!==ot&&T.minFilter!==Nt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function I(T){const x=new WeakRef(T);i.get(T).__ref=x,_.add(x),E.register(T,x,x)}function P(T){const x=i.get(T).__ref;x!==void 0&&(_.delete(x),E.unregister(x))}function R(T){V(T.target)}function U(T){D(T.target)}function V(T){T.removeEventListener("dispose",R),P(T),Y(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&m.delete(T)}function D(T){T.removeEventListener("dispose",U),P(T),te(T)}function G(){for(const T of _){const x=T.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):V(x))}_.clear(),m.clear()}function Y(T){const x=i.get(T);if(x.__webglInit===void 0)return;const O=T.source,ee=p.get(O);if(ee){const J=ee[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&k(T),Object.keys(ee).length===0&&p.delete(O)}i.remove(T)}function k(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const O=T.source,ee=p.get(O);delete ee[x.__cacheKey],a.memory.textures--}function te(T){const x=i.get(T);x.__depthDisposeCallback&&x.__depthDisposeCallback();const O=T.depthTexture;if(O&&O.renderTarget===T&&V(O),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(x.__webglFramebuffer[J]))for(let se=0;se<x.__webglFramebuffer[J].length;se++)n.deleteFramebuffer(x.__webglFramebuffer[J][se]);else n.deleteFramebuffer(x.__webglFramebuffer[J]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[J])}else{if(Array.isArray(x.__webglFramebuffer))for(let J=0;J<x.__webglFramebuffer.length;J++)n.deleteFramebuffer(x.__webglFramebuffer[J]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let J=0;J<x.__webglColorRenderbuffer.length;J++)x.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[J]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const ee=T.textures;for(let J=0,se=ee.length;J<se;J++){const ce=i.get(ee[J]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(ee[J])}i.remove(T)}let X=0;function Q(){X=0}function j(){return X}function ye(T){X=T}function Le(){const T=X;return T>=s.maxTextures&&Ce("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,T}function K(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.mipmapsAutoUpdate),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function me(T,x){const O=i.get(T);if(T.isVideoTexture&&ft(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const ee=T.image;if(ee===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{dt(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function ve(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){dt(O,T,x);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function we(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){dt(O,T,x);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function ge(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){Dt(O,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const Ie={[$i]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[Br]:n.MIRRORED_REPEAT},ct={[ot]:n.NEAREST,[nu]:n.NEAREST_MIPMAP_NEAREST,[ls]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[tr]:n.LINEAR_MIPMAP_NEAREST,[Hn]:n.LINEAR_MIPMAP_LINEAR},Re={[au]:n.NEVER,[ec]:n.ALWAYS,[ou]:n.LESS,[Ql]:n.LEQUAL,[lu]:n.EQUAL,[jl]:n.GEQUAL,[cu]:n.GREATER,[hu]:n.NOTEQUAL};function $e(T,x){if(x.type===un&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Nt||x.magFilter===tr||x.magFilter===ls||x.magFilter===Hn||x.minFilter===Nt||x.minFilter===tr||x.minFilter===ls||x.minFilter===Hn)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Ie[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Ie[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Ie[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ct[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ct[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Re[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ot||x.minFilter!==ls&&x.minFilter!==Hn||x.type===un&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Je(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R),I(x));const ee=x.source;let J=p.get(ee);J===void 0&&(J={},p.set(ee,J));const se=K(x);if(se!==T.__cacheKey){J[se]===void 0&&(J[se]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[se].usedTimes++;const ce=J[T.__cacheKey];ce!==void 0&&(J[T.__cacheKey].usedTimes--,ce.usedTimes===0&&k(x)),T.__cacheKey=se,T.__webglTexture=J[se].texture}return O}function ke(T,x,O){return Math.floor(Math.floor(T/O)/x)}function St(T,x,O,ee){const se=T.updateRanges;if(se.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,ee,x.data);else{se.sort((C,Z)=>C.start-Z.start);let ce=0;for(let C=1;C<se.length;C++){const Z=se[ce],W=se[C],oe=Z.start+Z.count,ie=ke(W.start,x.width,4),re=ke(Z.start,x.width,4);W.start<=oe+1&&ie===re&&ke(W.start+W.count-1,x.width,4)===ie?Z.count=Math.max(Z.count,W.start+W.count-Z.start):(++ce,se[ce]=W)}se.length=ce+1;const q=t.getParameter(n.UNPACK_ROW_LENGTH),$=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let C=0,Z=se.length;C<Z;C++){const W=se[C],oe=Math.floor(W.start/4),ie=Math.ceil(W.count/4),re=oe%x.width,be=Math.floor(oe/x.width),Fe=ie,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,re),t.pixelStorei(n.UNPACK_SKIP_ROWS,be),t.texSubImage2D(n.TEXTURE_2D,0,re,be,Fe,ne,O,ee,x.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,$),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function dt(T,x,O){let ee=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ee=n.TEXTURE_3D);const J=Je(T,x),se=x.source;t.bindTexture(ee,T.__webglTexture,n.TEXTURE0+O);const ce=i.get(se);if(se.version!==ce.__version||J===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ne=Ve.getPrimaries(Ve.workingColorSpace),Te=x.colorSpace===kn?null:Ve.getPrimaries(x.colorSpace),Ue=x.colorSpace===kn||ne===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let $=v(x.image,!1,s.maxTextureSize);$=Ae(x,$);const ae=r.convert(x.format,x.colorSpace),C=r.convert(x.type);let Z=w(x.internalFormat,ae,C,x.normalized,x.colorSpace,x.isVideoTexture);$e(ee,x);let W;const oe=x.mipmaps,ie=x.isVideoTexture!==!0,re=ce.__version===void 0||J===!0,be=se.dataReady,Fe=M(x,$);if(x.isDepthTexture)Z=g(x.format===Vn,x.type),re&&(ie?t.texStorage2D(n.TEXTURE_2D,1,Z,$.width,$.height):t.texImage2D(n.TEXTURE_2D,0,Z,$.width,$.height,0,ae,C,null));else if(x.isDataTexture)if(oe.length>0){ie&&re&&t.texStorage2D(n.TEXTURE_2D,Fe,Z,oe[0].width,oe[0].height);for(let ne=0,Te=oe.length;ne<Te;ne++)W=oe[ne],ie?be&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,W.width,W.height,ae,C,W.data):t.texImage2D(n.TEXTURE_2D,ne,Z,W.width,W.height,0,ae,C,W.data);x.generateMipmaps=!1}else ie?(re&&t.texStorage2D(n.TEXTURE_2D,Fe,Z,$.width,$.height),be&&St(x,$,ae,C)):t.texImage2D(n.TEXTURE_2D,0,Z,$.width,$.height,0,ae,C,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ie&&re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Z,oe[0].width,oe[0].height,$.depth);for(let ne=0,Te=oe.length;ne<Te;ne++)if(W=oe[ne],x.format!==dn)if(ae!==null)if(ie){if(be)if(x.layerUpdates.size>0){const Ue=Jo(W.width,W.height,x.format,x.type);for(const fe of x.layerUpdates){const Ke=W.data.subarray(fe*Ue/W.data.BYTES_PER_ELEMENT,(fe+1)*Ue/W.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,fe,W.width,W.height,1,ae,Ke)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,W.width,W.height,$.depth,ae,W.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Z,W.width,W.height,$.depth,0,W.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?be&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,W.width,W.height,$.depth,ae,C,W.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Z,W.width,W.height,$.depth,0,ae,C,W.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ie&&re&&t.texStorage2D(n.TEXTURE_2D,Fe,Z,oe[0].width,oe[0].height);for(let ne=0,Te=oe.length;ne<Te;ne++)W=oe[ne],x.format!==dn?ae!==null?ie?be&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,W.width,W.height,ae,W.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Z,W.width,W.height,0,W.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?be&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,W.width,W.height,ae,C,W.data):t.texImage2D(n.TEXTURE_2D,ne,Z,W.width,W.height,0,ae,C,W.data)}else if(x.isDataArrayTexture)if(ie){if(re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Z,$.width,$.height,$.depth),be)if(x.layerUpdates.size>0){const ne=Jo($.width,$.height,x.format,x.type);for(const Te of x.layerUpdates){const Ue=$.data.subarray(Te*ne/$.data.BYTES_PER_ELEMENT,(Te+1)*ne/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Te,$.width,$.height,1,ae,C,Ue)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ae,C,$.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Z,$.width,$.height,$.depth,0,ae,C,$.data);else if(x.isData3DTexture)ie?(re&&t.texStorage3D(n.TEXTURE_3D,Fe,Z,$.width,$.height,$.depth),be&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ae,C,$.data)):t.texImage3D(n.TEXTURE_3D,0,Z,$.width,$.height,$.depth,0,ae,C,$.data);else if(x.isFramebufferTexture){if(re)if(ie)t.texStorage2D(n.TEXTURE_2D,Fe,Z,$.width,$.height);else{let ne=$.width,Te=$.height;for(let Ue=0;Ue<Fe;Ue++)t.texImage2D(n.TEXTURE_2D,Ue,Z,ne,Te,0,ae,C,null),ne>>=1,Te>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),$.parentNode!==ne){ne.appendChild($),m.add(x),ne.onpaint=Te=>{const Ue=Te.changedElements;for(const fe of m)Ue.includes(fe.image)&&(fe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,$);else{const Ue=n.RGBA,fe=n.RGBA,Ke=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ue,fe,Ke,$)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(oe.length>0){if(ie&&re){const ne=Pe(oe[0]);t.texStorage2D(n.TEXTURE_2D,Fe,Z,ne.width,ne.height)}for(let ne=0,Te=oe.length;ne<Te;ne++)W=oe[ne],ie?be&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,ae,C,W):t.texImage2D(n.TEXTURE_2D,ne,Z,ae,C,W);x.generateMipmaps=!1}else if(ie){if(re){const ne=Pe($);t.texStorage2D(n.TEXTURE_2D,Fe,Z,ne.width,ne.height)}be&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,C,$)}else t.texImage2D(n.TEXTURE_2D,0,Z,ae,C,$);b(x)&&x.mipmapsAutoUpdate===!0&&y(ee),ce.__version=se.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Dt(T,x,O){if(x.image.length!==6)return;const ee=Je(T,x),J=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+O);const se=i.get(J);if(J.version!==se.__version||ee===!0){t.activeTexture(n.TEXTURE0+O);const ce=Ve.getPrimaries(Ve.workingColorSpace),q=x.colorSpace===kn?null:Ve.getPrimaries(x.colorSpace),$=x.colorSpace===kn||ce===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const ae=x.isCompressedTexture||x.image[0].isCompressedTexture,C=x.image[0]&&x.image[0].isDataTexture,Z=[];for(let fe=0;fe<6;fe++)!ae&&!C?Z[fe]=v(x.image[fe],!0,s.maxCubemapSize):Z[fe]=C?x.image[fe].image:x.image[fe],Z[fe]=Ae(x,Z[fe]);const W=Z[0],oe=r.convert(x.format,x.colorSpace),ie=r.convert(x.type);let re=w(x.internalFormat,oe,ie,x.normalized,x.colorSpace);const be=x.isVideoTexture!==!0,Fe=se.__version===void 0||ee===!0,ne=J.dataReady;let Te=M(x,W);$e(n.TEXTURE_CUBE_MAP,x);let Ue;if(x.isDepthTexture){if(re=g(x.format===Vn,x.type),Fe)if(be)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,re,W.width,W.height);else for(let fe=0;fe<6;fe++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,re,W.width,W.height,0,oe,ie,null)}else if(ae){be&&Fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,re,W.width,W.height);for(let fe=0;fe<6;fe++){Ue=Z[fe].mipmaps;for(let Ke=0;Ke<Ue.length;Ke++){const _t=Ue[Ke];x.format!==dn?oe!==null?be?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke,0,0,_t.width,_t.height,oe,_t.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke,re,_t.width,_t.height,0,_t.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke,0,0,_t.width,_t.height,oe,ie,_t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke,re,_t.width,_t.height,0,oe,ie,_t.data)}}}else{if(Ue=x.mipmaps,be&&Fe){Ue.length>0&&Te++;const fe=Pe(Z[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,re,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(C){be?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Z[fe].width,Z[fe].height,oe,ie,Z[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,re,Z[fe].width,Z[fe].height,0,oe,ie,Z[fe].data);for(let Ke=0;Ke<Ue.length;Ke++){const Cn=Ue[Ke].image[fe].image;be?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke+1,0,0,Cn.width,Cn.height,oe,ie,Cn.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke+1,re,Cn.width,Cn.height,0,oe,ie,Cn.data)}}else{be?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,oe,ie,Z[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,re,oe,ie,Z[fe]);for(let Ke=0;Ke<Ue.length;Ke++){const _t=Ue[Ke];be?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke+1,0,0,oe,ie,_t.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ke+1,re,oe,ie,_t.image[fe])}}}b(x)&&x.mipmapsAutoUpdate===!0&&y(n.TEXTURE_CUBE_MAP),se.__version=J.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function rt(T,x,O,ee,J,se){const ce=r.convert(O.format,O.colorSpace),q=r.convert(O.type),$=w(O.internalFormat,ce,q,O.normalized,O.colorSpace),ae=i.get(x),C=i.get(O);if(C.__renderTarget=x,!ae.__hasExternalTextures){const Z=Math.max(1,x.width>>se),W=Math.max(1,x.height>>se);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,se,$,Z,W,x.depth,0,ce,q,null):t.texImage2D(J,se,$,Z,W,0,ce,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),de(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,J,C.__webglTexture,0,it(x)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,J,C.__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function an(T,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const ee=x.depthTexture,J=ee&&ee.isDepthTexture?ee.type:null,se=g(x.stencilBuffer,J),ce=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;de(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it(x),se,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,it(x),se,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,se,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,T)}else{const ee=x.textures;for(let J=0;J<ee.length;J++){const se=ee[J],ce=r.convert(se.format,se.colorSpace),q=r.convert(se.type),$=w(se.internalFormat,ce,q,se.normalized,se.colorSpace);de(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it(x),$,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,it(x),$,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,$,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function gt(T,x,O){const ee=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(x.depthTexture);J.__renderTarget=x;const se=ee?x.depthTexture.image[0]:x.depthTexture.image;(!J.__webglTexture||se.width!==x.width||se.height!==x.height)&&(se.width=x.width,se.height=x.height,x.depthTexture.needsUpdate=!0),ee?ge(x.depthTexture,0):me(x.depthTexture,0);const ce=J.__webglTexture,q=it(x),$=ee?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,ae=x.depthTexture.format===Vn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Wn)de(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,$,ce,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,ae,$,ce,0);else if(x.depthTexture.format===Vn)de(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,$,ce,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,ae,$,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function kt(T){const x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const ee=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ee){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ee.removeEventListener("dispose",J)};ee.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=ee}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let ee=0;ee<6;ee++)gt(x.__webglFramebuffer[ee],T,ee);else T.texture.mipmaps.length>0?gt(x.__webglFramebuffer[0],T,0):gt(x.__webglFramebuffer,T,0);else if(O){x.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[ee]),x.__webglDepthbuffer[ee]===void 0)x.__webglDepthbuffer[ee]=n.createRenderbuffer(),an(x.__webglDepthbuffer[ee],T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,se)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),an(x.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,se)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(T,x,O){const ee=i.get(T);x!==void 0&&rt(ee.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&kt(T)}function Ht(T){const x=T.texture,O=i.get(T),ee=i.get(x);T.addEventListener("dispose",U),I(T);const J=T.textures,se=T.isWebGLCubeRenderTarget===!0,ce=J.length>1;if(ce||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=x.version,a.memory.textures++),se){O.__webglFramebuffer=[];for(let q=0;q<6;q++)if(x.mipmaps.length>0){O.__webglFramebuffer[q]=[];for(let $=0;$<x.mipmaps.length;$++)O.__webglFramebuffer[q][$]=n.createFramebuffer()}else O.__webglFramebuffer[q]=n.createFramebuffer()}else{if(x.mipmaps.length>0){O.__webglFramebuffer=[];for(let q=0;q<x.mipmaps.length;q++)O.__webglFramebuffer[q]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ce)for(let q=0,$=J.length;q<$;q++){const ae=i.get(J[q]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&de(T)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let q=0;q<J.length;q++){const $=J[q];O.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[q]);const ae=r.convert($.format,$.colorSpace),C=r.convert($.type),Z=w($.internalFormat,ae,C,$.normalized,$.colorSpace,T.isXRRenderTarget===!0),W=it(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,W,Z,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,O.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),an(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),$e(n.TEXTURE_CUBE_MAP,x);for(let q=0;q<6;q++)if(x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)rt(O.__webglFramebuffer[q][$],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else rt(O.__webglFramebuffer[q],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);b(x)?y(n.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(ce){for(let q=0,$=J.length;q<$;q++){const ae=J[q],C=i.get(ae);let Z=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Z=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,C.__webglTexture),$e(Z,ae),rt(O.__webglFramebuffer,T,ae,n.COLOR_ATTACHMENT0+q,Z,0),b(ae)&&y(Z)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,ee.__webglTexture),$e(q,x),x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)rt(O.__webglFramebuffer[$],T,x,n.COLOR_ATTACHMENT0,q,$);else rt(O.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,q,0);b(x)?y(q):x.mipmaps.length>0&&n.texParameteri(q,n.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&kt(T)}function N(T){const x=T.textures;for(let O=0,ee=x.length;O<ee;O++){const J=x[O];if(b(J)&&J.mipmapsAutoUpdate===!0){const se=A(T),ce=i.get(J).__webglTexture;t.bindTexture(se,ce),y(se),t.unbindTexture()}}}const Vt=[];function nt(T){if(T.samples>0){if(de(T)===!1){const x=T.textures,O=T.width,ee=T.height;let J=n.COLOR_BUFFER_BIT;const se=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(T),q=x.length>1;if(q)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ae]);const C=i.get(x[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,C,0)}n.blitFramebuffer(0,0,O,ee,0,0,O,ee,J,n.NEAREST),c===!0&&(Vt.length=0,Vt.push(n.COLOR_ATTACHMENT0+ae),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Vt.push(se),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Vt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ae]);const C=i.get(x[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,C,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function it(T){return Math.min(s.maxSamples,T.samples)}function de(T){const x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ft(T){const x=a.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Ae(T,x){const O=T.colorSpace,ee=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Zi&&O!==kn&&(Ve.getTransfer(O)===Ze?(ee!==dn||J!==zt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",O)),x}function Pe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Le,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=ye,this.setTexture2D=me,this.setTexture2DArray=ve,this.setTexture3D=we,this.setTextureCube=ge,this.rebindTextures=Gt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=de,this.dispose=G}function Gg(n,e){function t(i,s=kn){let r;const a=Ve.getTransfer(s);if(i===zt)return n.UNSIGNED_BYTE;if(i===Ta)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$l)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Xl)return n.BYTE;if(i===ql)return n.SHORT;if(i===Ki)return n.UNSIGNED_SHORT;if(i===ba)return n.INT;if(i===fn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===pn)return n.HALF_FLOAT;if(i===Kl)return n.ALPHA;if(i===Zl)return n.RGB;if(i===dn)return n.RGBA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Vn)return n.DEPTH_STENCIL;if(i===Jl)return n.RED;if(i===Aa)return n.RED_INTEGER;if(i===ni)return n.RG;if(i===Ra)return n.RG_INTEGER;if(i===Ca)return n.RGBA_INTEGER;if(i===Ds||i===Is||i===Ns||i===Us)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Us)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zr||i===kr||i===Gr||i===Hr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===zr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===kr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vr||i===Wr||i===Xr||i===qr||i===Yr||i===ks||i===$r)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Vr||i===Wr)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Xr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===qr)return r.COMPRESSED_R11_EAC;if(i===Yr)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ks)return r.COMPRESSED_RG11_EAC;if(i===$r)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Kr||i===Zr||i===Jr||i===Qr||i===jr||i===ea||i===ta||i===na||i===ia||i===sa||i===ra||i===aa||i===oa||i===la)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Kr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jr)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ea)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ta)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===na)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ia)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ra)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===aa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===la)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ca||i===ha||i===ua)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ca)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===da||i===fa||i===Gs||i===pa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===da)return r.COMPRESSED_RED_RGTC1_EXT;if(i===fa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ci?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Hg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Wg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Xn({vertexShader:Hg,fragmentShader:Vg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new Di(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xg extends si{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,m=null,u=null,p=null,_=null;const E=typeof XRWebGLBinding<"u",f=new Wg,d={},v=t.getContextAttributes();let b=null,y=null;const A=[],w=[],g=new ze;let M=null,I=null;const P=new qt;P.viewport=new lt;const R=new qt;R.viewport=new lt;const U=[P,R],V=new nd;let D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let me=A[K];return me===void 0&&(me=new hr,A[K]=me),me.getTargetRaySpace()},this.getControllerGrip=function(K){let me=A[K];return me===void 0&&(me=new hr,A[K]=me),me.getGripSpace()},this.getHand=function(K){let me=A[K];return me===void 0&&(me=new hr,A[K]=me),me.getHandSpace()};function Y(K){const me=w.indexOf(K.inputSource);if(me===-1)return;const ve=A[me];ve!==void 0&&(ve.update(K.inputSource,K.frame,l||a),ve.dispatchEvent({type:K.type,data:K.inputSource}))}function k(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",te);for(let K=0;K<A.length;K++){const me=w[K];me!==null&&(w[K]=null,A[K].disconnect(me))}D=null,G=null,f.reset();for(const K in d)delete d[K];if(e.setRenderTarget(b),p=null,u=null,m=null,s=null,y=null,Le.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(g.width,g.height,!1),I!==null){const K=I.camera;K.fov=I.fov,K.zoom=I.zoom,K.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return m===null&&E&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",k),s.addEventListener("inputsourceschange",te),v.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(g),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,we=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=v.stencil?Vn:Wn,we=v.stencil?Ci:fn);const Ie={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};m=this.getBinding(),u=m.createProjectionLayer(Ie),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new rn(u.textureWidth,u.textureHeight,{format:dn,type:zt,depthTexture:new Pi(u.textureWidth,u.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ve={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new rn(p.framebufferWidth,p.framebufferHeight,{format:dn,type:zt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Le.setContext(s),Le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function te(K){for(let me=0;me<K.removed.length;me++){const ve=K.removed[me],we=w.indexOf(ve);we>=0&&(w[we]=null,A[we].disconnect(ve))}for(let me=0;me<K.added.length;me++){const ve=K.added[me];let we=w.indexOf(ve);if(we===-1){for(let Ie=0;Ie<A.length;Ie++)if(Ie>=w.length){w.push(ve),we=Ie;break}else if(w[Ie]===null){w[Ie]=ve,we=Ie;break}if(we===-1)break}const ge=A[we];ge&&ge.connect(ve)}}function X(K,me){me===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(me.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let me=K.near,ve=K.far;f.texture!==null&&(f.depthNear>0&&(me=f.depthNear),f.depthFar>0&&(ve=f.depthFar)),V.near=R.near=P.near=me,V.far=R.far=P.far=ve,(D!==V.near||G!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),D=V.near,G=V.far),V.layers.mask=K.layers.mask|6,P.layers.mask=V.layers.mask&-5,R.layers.mask=V.layers.mask&-3;const we=K.parent,ge=V.cameras;X(V,we);for(let Ie=0;Ie<ge.length;Ie++)X(ge[Ie],we);V.projectionMatrix.copy(P.projectionMatrix),V.projectionMatrixInverse.copy(P.projectionMatrixInverse),I===null&&K.isPerspectiveCamera&&(I={camera:K,fov:K.fov,zoom:K.zoom}),Q(K,V,we)};function Q(K,me,ve){ve===null?K.matrix.copy(me.matrixWorld):(K.matrix.copy(ve.matrixWorld),K.matrix.invert(),K.matrix.multiply(me.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(me.projectionMatrix),K.projectionMatrixInverse.copy(me.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ga*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(V)},this.getCameraTexture=function(K){return d[K]};let j=null;function ye(K,me){if(h=me.getViewerPose(l||a),_=me,h!==null){const ve=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let we=!1;ve.length!==V.cameras.length&&(V.cameras.length=0,we=!0);for(let Re=0;Re<ve.length;Re++){const $e=ve[Re];let Je=null;if(p!==null)Je=p.getViewport($e);else{const St=m.getViewSubImage(u,$e);Je=St.viewport,Re===0&&(e.setRenderTargetTextures(y,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(y))}let ke=U[Re];ke===void 0&&(ke=new qt,ke.layers.enable(Re),ke.viewport=new lt,U[Re]=ke),ke.matrix.fromArray($e.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray($e.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(Je.x,Je.y,Je.width,Je.height),Re===0&&(V.matrix.copy(ke.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),we===!0&&V.cameras.push(ke)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){m=i.getBinding();const Re=m.getDepthInformation(ve[0]);Re&&Re.isValid&&Re.texture&&f.init(Re,s.renderState)}if(ge&&ge.includes("camera-access")&&E){e.state.unbindTexture(),m=i.getBinding();for(let Re=0;Re<ve.length;Re++){const $e=ve[Re].camera;if($e){let Je=d[$e];Je||(Je=new uc,d[$e]=Je);const ke=m.getCameraImage($e);Je.sourceTexture=ke}}}}for(let ve=0;ve<A.length;ve++){const we=w[ve],ge=A[ve];we!==null&&ge!==void 0&&ge.update(we,me,l||a)}j&&j(K,me),me.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:me}),_=null}const Le=new mc;Le.setAnimationLoop(ye),this.setAnimationLoop=function(K){j=K},this.dispose=function(){}}}const qg=new st,Tc=new Ne;Tc.set(-1,0,0,0,1,0,0,0,1);function Yg(n,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function i(f,d){d.color.getRGB(f.fogColor.value,dc(n)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,v,b,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),m(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),u(f,d),d.isMeshPhysicalMaterial&&p(f,d,y)):d.isMeshMatcapMaterial?(r(f,d),_(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),E(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,v,b):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Ut&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Ut&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const v=e.get(d),b=v.envMap,y=v.envMapRotation;b&&(f.envMap.value=b,f.envMapRotation.value.setFromMatrix4(qg.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Tc),f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,v,b){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*v,f.scale.value=b*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function m(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function p(f,d,v){f.ior.value=d.ior,d.diffuseRoughness>0&&(f.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=d.diffuseRoughnessMap,t(d.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ut&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.retroreflectivity>0&&(f.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,d){d.matcap&&(f.matcap.value=d.matcap)}function E(f,d){const v=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function $g(n,e,t,i){let s={},r={};function a(v,b){const y=b.program;i.uniformBlockBinding(v,y,s[v.id])}function o(v,b){let y=s[v.id];y===void 0&&(_(v),y=c(v),s[v.id]=y,v.addEventListener("dispose",f));const A=b.program;i.updateUBOMapping(v,A);const w=e.render.frame;r[v.id]!==w&&(l(v),r[v.id]=w)}function c(v){const b=n.createBuffer(),y=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,y,A),n.bindBuffer(n.UNIFORM_BUFFER,null),b}function l(v){const b=s[v.id],y=v.uniforms,A=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let w=0,g=y.length;w<g;w++){const M=y[w];if(Array.isArray(M))for(let I=0,P=M.length;I<P;I++)h(M[I],w,I,A);else h(M,w,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,b,y,A){if(u(v,b,y,A)===!0){const w=v.__offset,g=v.value;if(Array.isArray(g)){let M=0;for(let I=0;I<g.length;I++){const P=g[I],R=E(P,!0);m(P,v.__data,M),M+=R.storage/Float32Array.BYTES_PER_ELEMENT}}else m(g,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,w,v.__data)}}function m(v,b,y){typeof v=="number"||typeof v=="boolean"?b[y]=v:v.isMatrix3?(b[y]=v.elements[0],b[y+1]=v.elements[1],b[y+2]=v.elements[2],b[y+3]=0,b[y+4]=v.elements[3],b[y+5]=v.elements[4],b[y+6]=v.elements[5],b[y+7]=0,b[y+8]=v.elements[6],b[y+9]=v.elements[7],b[y+10]=v.elements[8],b[y+11]=0):ArrayBuffer.isView(v)?b.set(v.subarray(0,b.length-y),y):v.toArray(b,y)}function u(v,b,y,A){const w=v.value,g=b+"_"+y;if(Array.isArray(w)){A[g]===void 0&&(A[g]=[]);const M=A[g];let I=!1;for(let P=0;P<w.length;P++)p(w[P],M,P)===!0&&(I=!0);return I}return p(w,A,g)}function p(v,b,y){if(b[y]===void 0)return typeof v=="number"||typeof v=="boolean"?b[y]=v:ArrayBuffer.isView(v)?b[y]=v.slice():b[y]=v.clone(),!0;{const A=b[y];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return b[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function _(v){const b=v.uniforms;let y=0;const A=16;for(let g=0,M=b.length;g<M;g++){const I=Array.isArray(b[g])?b[g]:[b[g]];for(let P=0,R=I.length;P<R;P++){const U=I[P],V=Array.isArray(U.value)?U.value:[U.value],D=Array.isArray(b[g])||Array.isArray(U.value);let G=y;for(let k=0,te=V.length;k<te;k++){const X=V[k],Q=E(X,D),j=y%A,ye=j%Q.boundary,Le=j+ye;y+=ye,Le!==0&&A-Le<Q.storage&&(y+=A-Le),k===0&&(G=y),y+=Q.storage}const Y=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new Y((y-G)/Float32Array.BYTES_PER_ELEMENT),U.__offset=G}}const w=y%A;return w>0&&(y+=A-w),v.__size=y,v.__cache={},this}function E(v,b){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",v),b===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function f(v){const b=v.target;b.removeEventListener("dispose",f),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:d}}const Kg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function Zg(){return ln===null&&(ln=new Gu(Kg,16,16,ni,pn),ln.name="DFG_LUT",ln.minFilter=Nt,ln.magFilter=Nt,ln.wrapS=En,ln.wrapT=En,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Jg{constructor(e={}){const{canvas:t=fu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:p=zt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const E=p,f=new Set([Ca,Ra,Aa]),d=new Set([zt,fn,Ki,Ci,Ta,wa]),v=new Uint32Array(4),b=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]};let A=null,w=null;const g=[],M=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,U=null,V=null,D=null,G=null;this._outputColorSpace=It;let Y=0,k=0,te=null,X=-1,Q=null;const j=new lt,ye=new lt;let Le=null;const K=new Be(0);let me=0,ve=t.width,we=t.height,ge=1,Ie=null,ct=null;const Re=new lt(0,0,ve,we),$e=new lt(0,0,ve,we);let Je=!1;const ke=new Qi,St=new Na;let dt=!1,Dt=!1;const rt=new st,an=new z,gt=new lt,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Ht(){return te===null?ge:1}let N=i;function Vt(S,L){return t.getContext(S,L)}let nt,it,de,ft,Ae,Pe,T,x,O,ee,J,se,ce,q,$,ae,C,Z,W,oe,ie,re,be;try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ya}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",fe,!1),N===null){const L="webgl2";if(N=Vt(L,S),N===null)throw Vt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Fe()}catch(S){throw t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),Ye("WebGLRenderer: "+S.message),S}function Fe(){nt=new em(N),nt.init(),ie=new Gg(N,nt),it=new Vp(N,nt,e,ie),de=new zg(N,nt),it.reversedDepthBuffer&&u&&de.buffers.depth.setReversed(!0),V=N.createFramebuffer(),D=N.createFramebuffer(),G=N.createFramebuffer(),ft=new im(N),Ae=new Tg,Pe=new kg(N,nt,de,Ae,it,ie,ft),T=new jp(P),x=new sd(N),re=new Gp(N,x),O=new tm(N,x,ft,re),ee=new rm(N,O,x,re,ft),Z=new sm(N,it,Pe),$=new Wp(Ae),J=new bg(P,T,nt,it,re,$),se=new Yg(P,Ae),ce=new Ag,q=new Ig(nt),C=new kp(P,T,de,ee,_,c),ae=new Bg(P,ee,it),be=new $g(N,ft,it,de),W=new Hp(N,nt,ft),oe=new nm(N,nt,ft),ft.programs=J.programs,P.capabilities=it,P.extensions=nt,P.properties=Ae,P.renderLists=ce,P.shadowMap=ae,P.state=de,P.info=ft}E!==zt&&(I=new om(E,t.width,t.height,o,s,r));const ne=new Xg(P,N);this.xr=ne,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=nt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=nt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(S){S!==void 0&&(ge=S,this.setSize(ve,we,!1))},this.getSize=function(S){return S.set(ve,we)},this.setSize=function(S,L,H=!0){if(ne.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=S,we=L,t.width=Math.floor(S*ge),t.height=Math.floor(L*ge),H===!0&&(t.style.width=S+"px",t.style.height=L+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(ve*ge,we*ge).floor()},this.setDrawingBufferSize=function(S,L,H){ve=S,we=L,ge=H,t.width=Math.floor(S*H),t.height=Math.floor(L*H),this.setViewport(0,0,S,L)},this.setEffects=function(S){if(E===zt){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let L=0;L<S.length;L++)if(S[L].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(j)},this.getViewport=function(S){return S.copy(Re)},this.setViewport=function(S,L,H,F){S.isVector4?Re.set(S.x,S.y,S.z,S.w):Re.set(S,L,H,F),de.viewport(j.copy(Re).multiplyScalar(Ht()).round())},this.getScissor=function(S){return S.copy($e)},this.setScissor=function(S,L,H,F){S.isVector4?$e.set(S.x,S.y,S.z,S.w):$e.set(S,L,H,F),de.scissor(ye.copy($e).multiplyScalar(Ht()).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(S){de.setScissorTest(Je=S)},this.setOpaqueSort=function(S){Ie=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,L=!0,H=!0){let F=0;if(S){let B=!1;if(te!==null){const he=te.texture.format;B=f.has(he)}if(B){const he=te.texture.type,xe=d.has(he),le=C.getClearColor(),_e=C.getClearAlpha(),Ee=le.r,De=le.g,Ge=le.b;xe?(v[0]=Ee,v[1]=De,v[2]=Ge,v[3]=_e,N.clearBufferuiv(N.COLOR,0,v)):(b[0]=Ee,b[1]=De,b[2]=Ge,b[3]=_e,N.clearBufferiv(N.COLOR,0,b))}else F|=N.COLOR_BUFFER_BIT}L&&(F|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(F|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&N.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),C.dispose(),ce.dispose(),q.dispose(),Pe.dispose(),Ae.dispose(),T.dispose(),ee.dispose(),O.dispose(),re.dispose(),be.dispose(),J.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",Ga),ne.removeEventListener("sessionend",Ha),qn.stop()};function Te(S){S.preventDefault(),Po("WebGLRenderer: Context Lost."),R=!0}function Ue(){Po("WebGLRenderer: Context Restored."),R=!1;const S=ft.autoReset,L=ae.enabled,H=ae.autoUpdate,F=ae.needsUpdate,B=ae.type;Fe(),ft.autoReset=S,ae.enabled=L,ae.autoUpdate=H,ae.needsUpdate=F,ae.type=B}function fe(S){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ke(S){const L=S.target;L.removeEventListener("dispose",Ke),_t(L)}function _t(S){Cn(S),Ae.remove(S)}function Cn(S){const L=Ae.get(S).programs;L!==void 0&&(L.forEach(function(H){J.releaseProgram(H)}),S.isShaderMaterial&&J.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,H,F,B,he){L===null&&(L=kt);const xe=B.isMesh&&B.matrixWorld.determinantAffine()<0,le=Lc(S,L,H,F,B);de.setMaterial(F,xe);let _e=H.index,Ee=1;if(F.wireframe===!0){if(_e=O.getWireframeAttribute(H),_e===void 0)return;Ee=2}const De=H.drawRange,Ge=H.attributes.position;let Se=De.start*Ee,He=(De.start+De.count)*Ee;he!==null&&(Se=Math.max(Se,he.start*Ee),He=Math.min(He,(he.start+he.count)*Ee)),_e!==null?(Se=Math.max(Se,0),He=Math.min(He,_e.count)):Ge!=null&&(Se=Math.max(Se,0),He=Math.min(He,Ge.count));const ht=He-Se;if(ht<0||ht===1/0)return;re.setup(B,F,le,H,_e);let tt,Qe=W;if(_e!==null&&(tt=x.get(_e),Qe=oe,Qe.setIndex(tt)),B.isMesh)F.wireframe===!0?(de.setLineWidth(F.wireframeLinewidth*Ht()),Qe.setMode(N.LINES)):Qe.setMode(N.TRIANGLES);else if(B.isLine){let bt=F.linewidth;bt===void 0&&(bt=1),de.setLineWidth(bt*Ht()),B.isLineSegments?Qe.setMode(N.LINES):B.isLineLoop?Qe.setMode(N.LINE_LOOP):Qe.setMode(N.LINE_STRIP)}else B.isPoints?Qe.setMode(N.POINTS):B.isSprite&&Qe.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))Qe.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const bt=B._multiDrawStarts,Me=B._multiDrawCounts,Ct=B._multiDrawCount,qe=_e?x.get(_e).bytesPerElement:1,Yn=Ae.get(F).currentProgram.getUniforms();for(let Tt=0;Tt<Ct;Tt++)Yn.setValue(N,"_gl_DrawID",Tt),Qe.render(bt[Tt]/qe,Me[Tt])}else if(B.isInstancedMesh)Qe.renderInstances(Se,ht,B.count);else if(H.isInstancedBufferGeometry){const bt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Me=Math.min(H.instanceCount,bt);Qe.renderInstances(Se,ht,Me)}else Qe.render(Se,ht)};function ka(S,L,H,F){U!==null&&S.isNodeMaterial&&U.setObject(F,S),dt===!0&&$.setState(S,H,!1),S.transparent===!0&&S.side===hn&&S.forceSinglePass===!1?(S.side=Ut,S.needsUpdate=!0,Ni(S,L,F),S.side=ti,S.needsUpdate=!0,Ni(S,L,F),S.side=hn):Ni(S,L,F)}this.compile=function(S,L,H=null){H===null&&(H=S),U!==null&&U.renderStart(S,L,H),w=q.get(H),w.init(L),M.push(w),H.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),S!==H&&S.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights(),U!==null&&U.updateLights(w.state.lightsArray),Dt=this.localClippingEnabled,dt=$.init(this.clippingPlanes,Dt),dt===!0&&$.setGlobalState(this.clippingPlanes,L),U!==null&&ae.render(w.state.shadowsArray,H,L);const F=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const le=he[xe];ka(le,H,L,B),F.add(le)}else ka(he,H,L,B),F.add(he)}),w=M.pop(),U!==null&&U.renderEnd(),F},this.compileAsync=function(S,L,H=null){const F=this.compile(S,L,H);return new Promise(B=>{function he(){if(F.forEach(function(xe){const _e=Ae.get(xe).currentProgram;(_e===void 0||_e.isReady())&&F.delete(xe)}),F.size===0){B(S);return}setTimeout(he,10)}nt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Zs=null;function Cc(S){Zs&&Zs(S)}function Ga(){qn.stop()}function Ha(){qn.start()}const qn=new mc;qn.setAnimationLoop(Cc),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(S){Zs=S,ne.setAnimationLoop(S),S===null?qn.stop():qn.start()},ne.addEventListener("sessionstart",Ga),ne.addEventListener("sessionend",Ha),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(S,L);const H=ne.enabled===!0&&ne.isPresenting===!0,F=I!==null&&(te===null||H)&&I.begin(P,te);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(L),L=ne.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,L,te),w=q.get(S,M.length),w.init(L),w.state.textureUnits=Pe.getTextureUnits(),M.push(w),rt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?St.setFromArrayCamera(L):ke.setFromProjectionMatrix(rt,sn,L.reversedDepth),Dt=this.localClippingEnabled,dt=$.init(this.clippingPlanes,Dt),A=ce.get(S,g.length),A.init(),g.push(A),this.info.render.frame++,ne.enabled===!0&&ne.isPresenting===!0){const xe=P.xr.getDepthSensingMesh();xe!==null&&Js(xe,L,-1/0,P.sortObjects)}Js(S,L,0,P.sortObjects),A.finish(),U!==null&&U.updateLights(w.state.lightsArray),P.sortObjects===!0&&A.sort(Ie,ct),Gt=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,Gt&&C.addToRenderList(A,S),this.info.autoReset===!0&&this.info.reset(),dt===!0&&$.beginShadows();const B=w.state.shadowsArray;if(ae.render(B,S,L),dt===!0&&$.endShadows(),(F&&I.hasRenderPass())===!1){const xe=A.opaque,le=A.transmissive;if(w.setupLights(),L.isArrayCamera){const _e=L.cameras;if(le.length>0)for(let Ee=0,De=_e.length;Ee<De;Ee++){const Ge=_e[Ee];Wa(xe,le,S,Ge)}Gt&&C.render(S);for(let Ee=0,De=_e.length;Ee<De;Ee++){const Ge=_e[Ee];Va(A,S,Ge,Ge.viewport)}}else le.length>0&&Wa(xe,le,S,L),Gt&&C.render(S),Va(A,S,L)}te!==null&&k===0&&(Pe.updateMultisampleRenderTarget(te),Pe.updateRenderTargetMipmap(te)),F&&I.end(P),S.isScene===!0&&S.onAfterRender(P,S,L),re.resetDefaultState(),X=-1,Q=null,M.pop(),M.length>0?(w=M[M.length-1],Pe.setTextureUnits(w.state.textureUnits),dt===!0&&$.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,g.pop(),g.length>0?A=g[g.length-1]:A=null,U!==null&&U.renderEnd()};function Js(S,L,H,F){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){const xe=L.isArrayCamera?St:ke;if(!S.frustumCulled||S.intersectsFrustum(xe)){F&&gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(rt);const le=ee.update(S),_e=S.material;_e.visible&&A.push(S,le,_e,H,gt.z,null,L)}}else if(S.isMesh||S.isLine||S.isPoints){const xe=L.isArrayCamera?St:ke;if(!S.frustumCulled||S.intersectsFrustum(xe)){const le=ee.update(S),_e=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),gt.copy(S.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),gt.copy(le.boundingSphere.center)),gt.applyMatrix4(S.matrixWorld).applyMatrix4(rt)),Array.isArray(_e)){const Ee=le.groups;for(let De=0,Ge=Ee.length;De<Ge;De++){const Se=Ee[De],He=_e[Se.materialIndex];He&&He.visible&&A.push(S,le,He,H,gt.z,Se,L)}}else _e.visible&&A.push(S,le,_e,H,gt.z,null,L)}}}const he=S.children;for(let xe=0,le=he.length;xe<le;xe++)Js(he[xe],L,H,F)}function Va(S,L,H,F){const{opaque:B,transmissive:he,transparent:xe}=S;w.setupLightsView(H),dt===!0&&$.setGlobalState(P.clippingPlanes,H),F&&de.viewport(j.copy(F)),B.length>0&&rs(B,L,H),he.length>0&&rs(he,L,H),xe.length>0&&rs(xe,L,H),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Wa(S,L,H,F){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[F.id]===void 0){const Se=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[F.id]=new rn(1,1,{generateMipmaps:!0,type:Se?pn:zt,minFilter:Hn,samples:Math.max(4,it.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ve.workingColorSpace})}const he=w.state.transmissionRenderTarget[F.id],xe=F.viewport||j;he.setSize(xe.z*P.transmissionResolutionScale,xe.w*P.transmissionResolutionScale);const le=P.getRenderTarget(),_e=P.getActiveCubeFace(),Ee=P.getActiveMipmapLevel();P.setRenderTarget(he),P.getClearColor(K),me=P.getClearAlpha(),me<1&&P.setClearColor(16777215,.5),P.clear(),Gt&&C.render(H);const De=P.toneMapping;P.toneMapping=wn;const Ge=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),w.setupLightsView(F),dt===!0&&$.setGlobalState(P.clippingPlanes,F),rs(S,H,F),Pe.updateMultisampleRenderTarget(he),Pe.updateRenderTargetMipmap(he),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Se=!1;for(let He=0,ht=L.length;He<ht;He++){const tt=L[He],{object:Qe,geometry:bt,material:Me,group:Ct}=tt;if(Me.side===hn&&Qe.layers.test(F.layers)){const qe=Me.side;Me.side=Ut,Me.needsUpdate=!0,Xa(Qe,H,F,bt,Me,Ct),Me.side=qe,Me.needsUpdate=!0,Se=!0}}Se===!0&&(Pe.updateMultisampleRenderTarget(he),Pe.updateRenderTargetMipmap(he))}P.setRenderTarget(le,_e,Ee),P.setClearColor(K,me),Ge!==void 0&&(F.viewport=Ge),P.toneMapping=De}function rs(S,L,H){const F=L.isScene===!0?L.overrideMaterial:null;for(let B=0,he=S.length;B<he;B++){const xe=S[B],{object:le,geometry:_e,group:Ee}=xe;let De=xe.material;De.allowOverride===!0&&F!==null&&(De=F),le.layers.test(H.layers)&&Xa(le,L,H,_e,De,Ee)}}function Xa(S,L,H,F,B,he){U!==null&&B.isNodeMaterial&&U.setObject(S,B),S.onBeforeRender(P,L,H,F,B,he),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(P,L,H,F,S,he),B.transparent===!0&&B.side===hn&&B.forceSinglePass===!1?(B.side=Ut,B.needsUpdate=!0,P.renderBufferDirect(H,L,F,B,S,he),B.side=ti,B.needsUpdate=!0,P.renderBufferDirect(H,L,F,B,S,he),B.side=hn):P.renderBufferDirect(H,L,F,B,S,he),S.onAfterRender(P,L,H,F,B,he)}function qa(S){let L=0;for(const H of S)H.texture!==null&&L++;return L}function Ni(S,L,H){L.isScene!==!0&&(L=kt);const F=Ae.get(S),B=w.state.lights,he=w.state.shadowsArray,xe=B.state.version,le=J.getParameters(S,B.state,he,L,H,w.state.lightProbeGridArray),_e=J.getProgramCacheKey(le);let Ee=F.programs;F.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,F.fog=L.fog;const De=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;F.envMap=T.get(S.envMap||F.environment,De),F.envMapRotation=F.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,Ee===void 0&&(S.addEventListener("dispose",Ke),Ee=new Map,F.programs=Ee,F.programVariants=new Map);let Ge=Ee.get(_e);if(Ge!==void 0){if(F.currentProgram===Ge&&F.lightsStateVersion===xe)return $a(S,le),Ge}else le.uniforms=J.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,H,le),S.onBeforeCompile(le,P),Ge=J.acquireProgram(le,_e),Ee.set(_e,Ge),F.uniforms=le.uniforms;const Se=F.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Se.clippingPlanes=$.uniform),$a(S,le),F.needsLights=Ic(S),F.lightsStateVersion=xe,F.needsLights&&(Se.ambientLightColor.value=B.state.ambient,Se.lightProbe.value=B.state.probe,Se.sunLights.value=B.state.sun,Se.sunLightShadows.value=B.state.sunShadow,Se.directionalLights.value=B.state.directional,Se.directionalLightShadows.value=B.state.directionalShadow,Se.spotLights.value=B.state.spot,Se.spotLightShadows.value=B.state.spotShadow,Se.rectAreaLights.value=B.state.rectArea,Se.ltc_1.value=B.state.rectAreaLTC1,Se.ltc_2.value=B.state.rectAreaLTC2,Se.pointLights.value=B.state.point,Se.pointLightShadows.value=B.state.pointShadow,Se.hemisphereLights.value=B.state.hemi,Se.sunShadowMatrix.value=B.state.sunShadowMatrix,Se.sunShadowCascade.value=B.state.sunShadowCascade,Se.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Se.spotLightMatrix.value=B.state.spotLightMatrix,Se.spotLightMap.value=B.state.spotLightMap,Se.pointShadowMatrix.value=B.state.pointShadowMatrix),F.numLightProbeGrids=qa(w.state.lightProbeGridArray),F.currentProgram=Ge,F.uniformsList=null,Ge}function Pc(S,L,H,F,B){const he=Ae.get(S),xe=he.currentProgram.id+","+F+","+B;let le=he.programVariants.get(xe);return le===void 0?(le=Ni(S,L,H),he.programVariants.set(xe,le)):(he.currentProgram=le,he.uniformsList=null,he.outputColorSpace=F,he.toneMapping=B),le}function Ya(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=Os.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function $a(S,L){const H=Ae.get(S);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function Lc(S,L,H,F,B){L.isScene!==!0&&(L=kt),Pe.resetTextureUnits();const he=L.fog,xe=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?L.environment:null,le=te===null?P.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ve.workingColorSpace,_e=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Ee=T.get(F.envMap||xe,_e),De=F.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ge=!!H.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Se=!!H.morphAttributes.position,He=!!H.morphAttributes.normal,ht=!!H.morphAttributes.color;let tt=wn;F.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(tt=P.toneMapping);const Qe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,bt=Qe!==void 0?Qe.length:0,Me=Ae.get(F),Ct=w.state.lights;if(dt===!0&&(Dt===!0||S!==Q)){const at=S===Q&&F.id===X;$.setState(F,S,at)}let qe=!1,Yn=!1;F.version===Me.__version?Me.needsLights&&Me.lightsStateVersion!==Ct.state.version||B.isBatchedMesh&&Me.batching===!1||!B.isBatchedMesh&&Me.batching===!0||B.isBatchedMesh&&Me.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&Me.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&Me.instancing===!1||!B.isInstancedMesh&&Me.instancing===!0||B.isSkinnedMesh&&Me.skinning===!1||!B.isSkinnedMesh&&Me.skinning===!0||B.isInstancedMesh&&Me.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Me.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Me.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Me.instancingMorph===!1&&B.morphTexture!==null||Me.envMap!==Ee||F.fog===!0&&Me.fog!==he||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==$.numPlanes||Me.numIntersection!==$.numIntersection)||Me.vertexAlphas!==De||Me.vertexTangents!==Ge||Me.morphTargets!==Se||Me.morphNormals!==He||Me.morphColors!==ht||Me.morphTargetsCount!==bt||Me.numLightProbeGrids!==qa(w.state.lightProbeGridArray)?qe=!0:(Me.outputColorSpace!==le||Me.toneMapping!==tt)&&(Yn=!0):(qe=!0,Me.__version=F.version);let Tt=Me.currentProgram;(qe===!0||Yn===!0)&&(Tt=Yn===!0?Pc(F,L,B,le,tt):Ni(F,L,B),U&&F.isNodeMaterial&&U.onUpdateProgram(F,Tt,Me));let as=!1,Pn=!1,$n=!1;const Xe=Tt.getUniforms(),Mt=Me.uniforms;if(de.useProgram(Tt.program)&&(as=!0,Pn=!0,$n=!0),F.id!==X&&(X=F.id,Pn=!0),as||Q!==S){de.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Xe.setValue(N,"projectionMatrix",S.projectionMatrix),Xe.setValue(N,"viewMatrix",S.matrixWorldInverse);const xt=Xe.map.cameraPosition;xt!==void 0&&xt.setValue(N,an.setFromMatrixPosition(S.matrixWorld)),it.logarithmicDepthBuffer&&Xe.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Xe.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),Q!==S&&(Q=S,Pn=!0,$n=!0)}if(Me.needsLights&&(Ct.state.sunShadowMap.length>0&&Xe.setValue(N,"sunShadowMap",Ct.state.sunShadowMap,Pe),Ct.state.directionalShadowMap.length>0&&Xe.setValue(N,"directionalShadowMap",Ct.state.directionalShadowMap,Pe),Ct.state.spotShadowMap.length>0&&Xe.setValue(N,"spotShadowMap",Ct.state.spotShadowMap,Pe),Ct.state.pointShadowMap.length>0&&Xe.setValue(N,"pointShadowMap",Ct.state.pointShadowMap,Pe)),B.isSkinnedMesh){Xe.setOptional(N,B,"bindMatrix"),Xe.setOptional(N,B,"bindMatrixInverse");const at=B.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),Xe.setValue(N,"boneTexture",at.boneTexture,Pe))}B.isBatchedMesh&&(Xe.setOptional(N,B,"batchingTexture"),Xe.setValue(N,"batchingTexture",B._matricesTexture,Pe),Xe.setOptional(N,B,"batchingIdTexture"),Xe.setValue(N,"batchingIdTexture",B._indirectTexture,Pe),Xe.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&Xe.setValue(N,"batchingColorTexture",B._colorsTexture,Pe));const $t=H.morphAttributes;if(($t.position!==void 0||$t.normal!==void 0||$t.color!==void 0)&&Z.update(B,H,Tt),(Pn||Me.receiveShadow!==B.receiveShadow)&&(Me.receiveShadow=B.receiveShadow,Xe.setValue(N,"receiveShadow",B.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&L.environment!==null&&(Mt.envMapIntensity.value=L.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=Zg()),Pn){if(Xe.setValue(N,"toneMappingExposure",P.toneMappingExposure),Me.needsLights&&Dc(Mt,$n),he&&F.fog===!0&&se.refreshFogUniforms(Mt,he),se.refreshMaterialUniforms(Mt,F,ge,we,w.state.transmissionRenderTarget[S.id]),Me.needsLights&&Me.numLightProbeGrids>0){const at=y;let xt=0;for(const mn of w.state.lightProbeGridArray)mn.texture!==null&&(at.textures[xt]=mn.texture,at.min[xt]=mn.boundingBox.min,at.max[xt]=mn.boundingBox.max,at.resolution[xt]=mn.resolution,xt++);for(const mn in at)at[mn].length=xt;Mt.probesSH.value=at.textures,Mt.probesMin.value=at.min,Mt.probesMax.value=at.max,Mt.probesResolution.value=at.resolution}Os.upload(N,Ya(Me),Mt,Pe)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Os.upload(N,Ya(Me),Mt,Pe),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Xe.setValue(N,"center",B.center),Xe.setValue(N,"modelViewMatrix",B.modelViewMatrix),Xe.setValue(N,"normalMatrix",B.normalMatrix),Xe.setValue(N,"modelMatrix",B.matrixWorld),F.uniformsGroups!==void 0){const at=F.uniformsGroups;for(let xt=0,mn=at.length;xt<mn;xt++){const Za=at[xt];be.update(Za,Tt),be.bind(Za,Tt)}}return Tt}function Dc(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.sunLights.needsUpdate=L,S.sunLightShadows.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function Ic(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(S,L,H){const F=Ae.get(S);F.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),Ae.get(S.texture).__webglTexture=L,Ae.get(S.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:H,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,L){const H=Ae.get(S);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,H=0){te=S,Y=L,k=H;let F=null,B=!1,he=!1;if(S){const le=Ae.get(S);if(le.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(N.FRAMEBUFFER,le.__webglFramebuffer),j.copy(S.viewport),ye.copy(S.scissor),Le=S.scissorTest,de.viewport(j),de.scissor(ye),de.setScissorTest(Le),X=-1;return}else if(le.__webglFramebuffer===void 0)Pe.setupRenderTarget(S);else if(le.__hasExternalTextures)Pe.rebindTextures(S,Ae.get(S.texture).__webglTexture,Ae.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const De=S.depthTexture;if(le.__boundDepthTexture!==De){if(De!==null&&Ae.has(De)&&(S.width!==De.image.width||S.height!==De.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Pe.setupDepthRenderbuffer(S)}}const _e=S.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(he=!0);const Ee=Ae.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ee[L])?F=Ee[L][H]:F=Ee[L],B=!0):S.samples>0&&Pe.useMultisampledRTT(S)===!1?F=Ae.get(S).__webglMultisampledFramebuffer:Array.isArray(Ee)?F=Ee[H]:F=Ee,j.copy(S.viewport),ye.copy(S.scissor),Le=S.scissorTest}else j.copy(Re).multiplyScalar(ge).floor(),ye.copy($e).multiplyScalar(ge).floor(),Le=Je;if(H!==0&&(F=V),de.bindFramebuffer(N.FRAMEBUFFER,F)&&de.drawBuffers(S,F),de.viewport(j),de.scissor(ye),de.setScissorTest(Le),B){const le=Ae.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,le.__webglTexture,H)}else if(he){const le=L;for(let _e=0;_e<S.textures.length;_e++){const Ee=Ae.get(S.textures[_e]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+_e,Ee.__webglTexture,H,le)}}else if(S!==null&&H!==0){const le=Ae.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,le.__webglTexture,H)}X=-1};function Ka(S){const L=Ae.get(S);return(L.__readFormat!==S.format||L.__readType!==S.type)&&(L.__readFormat=S.format,L.__readType=S.type,L.__formatReadable=it.textureFormatReadable(S.format),L.__typeReadable=it.textureTypeReadable(S.type)),L}this.readRenderTargetPixels=function(S,L,H,F,B,he,xe,le=0){if(!(S&&S.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ae.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe],Array.isArray(_e)&&(_e=_e[0])),_e){de.bindFramebuffer(N.FRAMEBUFFER,_e);try{const Ee=S.textures[le],De=Ee.format,Ge=Ee.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+le);const Se=Ka(Ee);if(Se.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Se.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-F&&H>=0&&H<=S.height-B&&N.readPixels(L,H,F,B,ie.convert(De),ie.convert(Ge),he)}finally{const Ee=te!==null?Ae.get(te).__webglFramebuffer:null;de.bindFramebuffer(N.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,L,H,F,B,he,xe,le=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Ae.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe],Array.isArray(_e)&&(_e=_e[0])),_e)if(L>=0&&L<=S.width-F&&H>=0&&H<=S.height-B){de.bindFramebuffer(N.FRAMEBUFFER,_e);const Ee=S.textures[le],De=Ee.format,Ge=Ee.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+le);const Se=Ka(Ee);if(Se.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Se.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,He),N.bufferData(N.PIXEL_PACK_BUFFER,he.byteLength,N.STREAM_READ),N.readPixels(L,H,F,B,ie.convert(De),ie.convert(Ge),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const ht=te!==null?Ae.get(te).__webglFramebuffer:null;de.bindFramebuffer(N.FRAMEBUFFER,ht);const tt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await pu(N,tt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,He),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,he),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(He),N.deleteSync(tt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,L=null,H=0){const F=Math.pow(2,-H),B=Math.floor(S.image.width*F),he=Math.floor(S.image.height*F),xe=L!==null?L.x:0,le=L!==null?L.y:0;Pe.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,H,0,0,xe,le,B,he),de.unbindTexture()},this.copyTextureToTexture=function(S,L,H=null,F=null,B=0,he=0){let xe,le,_e,Ee,De,Ge,Se,He,ht;const tt=S.isCompressedTexture?S.mipmaps[he]:S.image;if(H!==null)xe=H.max.x-H.min.x,le=H.max.y-H.min.y,_e=H.isBox3?H.max.z-H.min.z:1,Ee=H.min.x,De=H.min.y,Ge=H.isBox3?H.min.z:0;else{const Xe=Math.pow(2,-B);xe=Math.floor(tt.width*Xe),le=Math.floor(tt.height*Xe),S.isDataArrayTexture?_e=tt.depth:S.isData3DTexture?_e=Math.floor(tt.depth*Xe):_e=1,Ee=0,De=0,Ge=0}F!==null?(Se=F.x,He=F.y,ht=F.z):(Se=0,He=0,ht=0);const Qe=ie.convert(L.format),bt=ie.convert(L.type);let Me;L.isData3DTexture?(Pe.setTexture3D(L,0),Me=N.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Pe.setTexture2DArray(L,0),Me=N.TEXTURE_2D_ARRAY):(Pe.setTexture2D(L,0),Me=N.TEXTURE_2D),de.activeTexture(N.TEXTURE0),de.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,L.flipY),de.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),de.pixelStorei(N.UNPACK_ALIGNMENT,L.unpackAlignment);const Ct=de.getParameter(N.UNPACK_ROW_LENGTH),qe=de.getParameter(N.UNPACK_IMAGE_HEIGHT),Yn=de.getParameter(N.UNPACK_SKIP_PIXELS),Tt=de.getParameter(N.UNPACK_SKIP_ROWS),as=de.getParameter(N.UNPACK_SKIP_IMAGES);de.pixelStorei(N.UNPACK_ROW_LENGTH,tt.width),de.pixelStorei(N.UNPACK_IMAGE_HEIGHT,tt.height),de.pixelStorei(N.UNPACK_SKIP_PIXELS,Ee),de.pixelStorei(N.UNPACK_SKIP_ROWS,De),de.pixelStorei(N.UNPACK_SKIP_IMAGES,Ge);const Pn=S.isDataArrayTexture||S.isData3DTexture,$n=L.isDataArrayTexture||L.isData3DTexture;if(S.isDepthTexture){const Xe=Ae.get(S),Mt=Ae.get(L),$t=Ae.get(Xe.__renderTarget),at=Ae.get(Mt.__renderTarget);de.bindFramebuffer(N.READ_FRAMEBUFFER,$t.__webglFramebuffer),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let xt=0;xt<_e;xt++)Pn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(S).__webglTexture,B,Ge+xt),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(L).__webglTexture,he,ht+xt)),N.blitFramebuffer(Ee,De,Ee+xe,De+le,Se,He,Se+xe,He+le,N.DEPTH_BUFFER_BIT,N.NEAREST);de.bindFramebuffer(N.READ_FRAMEBUFFER,null),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||Ae.has(S)){const Xe=Ae.get(S),Mt=Ae.get(L);de.bindFramebuffer(N.READ_FRAMEBUFFER,D),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,G);for(let $t=0;$t<_e;$t++)Pn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xe.__webglTexture,B,Ge+$t):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xe.__webglTexture,B),$n?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mt.__webglTexture,he,ht+$t):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mt.__webglTexture,he),B!==0?N.blitFramebuffer(Ee,De,Ee+xe,De+le,Se,He,Se+xe,He+le,N.COLOR_BUFFER_BIT,N.NEAREST):$n?N.copyTexSubImage3D(Me,he,Se,He,ht+$t,Ee,De,xe,le):N.copyTexSubImage2D(Me,he,Se,He,Ee,De,xe,le);de.bindFramebuffer(N.READ_FRAMEBUFFER,null),de.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else $n?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(Me,he,Se,He,ht,xe,le,_e,Qe,bt,tt.data):L.isCompressedArrayTexture?N.compressedTexSubImage3D(Me,he,Se,He,ht,xe,le,_e,Qe,tt.data):N.texSubImage3D(Me,he,Se,He,ht,xe,le,_e,Qe,bt,tt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,he,Se,He,xe,le,Qe,bt,tt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,he,Se,He,tt.width,tt.height,Qe,tt.data):N.texSubImage2D(N.TEXTURE_2D,he,Se,He,xe,le,Qe,bt,tt);de.pixelStorei(N.UNPACK_ROW_LENGTH,Ct),de.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qe),de.pixelStorei(N.UNPACK_SKIP_PIXELS,Yn),de.pixelStorei(N.UNPACK_SKIP_ROWS,Tt),de.pixelStorei(N.UNPACK_SKIP_IMAGES,as),he===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&N.generateMipmap(Me),de.unbindTexture()},this.initRenderTarget=function(S){Ae.get(S).__webglFramebuffer===void 0&&Pe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Pe.setTextureCube(S,0):S.isData3DTexture?Pe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Pe.setTexture2DArray(S,0):Pe.setTexture2D(S,0),de.unbindTexture()},this.resetState=function(){Y=0,k=0,te=null,de.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}const wc=[],Ac=[];let va=1,Sa=0;function Qg(n){n.snap!==void 0&&(va=n.snap?1:0),n.wobble!==void 0&&(Sa=n.wobble?1:0);for(const e of wc)e.value=va;for(const e of Ac)e.value=Sa}function ei(n){n.onBeforeCompile=e=>{const t={value:va},i={value:Sa};wc.push(t),Ac.push(i),e.uniforms.uSnap=t,e.uniforms.uWobble=i,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
uniform float uSnap;
uniform float uWobble;`).replace("#include <project_vertex>",`#include <project_vertex>
if (uSnap > 0.5) {
  float snapW = max(abs(gl_Position.w), 0.0001);
  vec2 grid = vec2(480.0, 270.0);
  gl_Position.xy = floor(gl_Position.xy / snapW * grid + 0.5) / grid * snapW;
}`).replace("vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;",`vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
if (uWobble > 0.5) {
  vMapUv = floor(vMapUv * 24.0 + gl_Position.w * 0.4) / 24.0;
}`)}}const vl=new Map;function Yt(n){const e=vl.get(n);if(e)return e;const t=new Ti({color:n,flatShading:!0});return ei(t),vl.set(n,t),t}function yn(n,e=1){const t=new lc({color:n,transparent:e<1,opacity:e,depthWrite:e>=1});return ei(t),t}const jg=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,e0=`
uniform sampler2D tDiffuse;
uniform vec2 uSize;
varying vec2 vUv;

float bayer4(vec2 p) {
  float x = mod(floor(p.x), 4.0);
  float y = mod(floor(p.y), 4.0);
  if (y < 0.5) {
    if (x < 0.5) return 0.0;
    if (x < 1.5) return 8.0;
    if (x < 2.5) return 2.0;
    return 10.0;
  }
  if (y < 1.5) {
    if (x < 0.5) return 12.0;
    if (x < 1.5) return 4.0;
    if (x < 2.5) return 14.0;
    return 6.0;
  }
  if (y < 2.5) {
    if (x < 0.5) return 3.0;
    if (x < 1.5) return 11.0;
    if (x < 2.5) return 1.0;
    return 9.0;
  }
  if (x < 0.5) return 15.0;
  if (x < 1.5) return 7.0;
  if (x < 2.5) return 13.0;
  return 5.0;
}

void main() {
  vec2 texel = floor(clamp(vUv, 0.0, 0.999) * uSize);
  vec3 col = texture2D(tDiffuse, (texel + 0.5) / uSize).rgb;
  float d = bayer4(texel) / 16.0 - 0.5;
  float levels = 24.0;
  col = clamp(floor(col * levels + d * 0.9 + 0.5) / levels, 0.0, 1.0);
  gl_FragColor = linearToOutputTexel(vec4(col, 1.0));
}
`;function t0(){const n=new ze(480,270),e=new Xn({uniforms:{tDiffuse:{value:null},uSize:{value:n}},vertexShader:jg,fragmentShader:e0,depthTest:!1,depthWrite:!1,toneMapped:!1}),t=new rc,i=new Fa(-1,1,1,-1,0,1),s=new je(new Di(2,2),e);return s.frustumCulled=!1,t.add(s),{scene:t,camera:i,material:e,setSize(r,a){n.set(r,a)}}}const Sl=new Be(9148820);class n0{renderer;camera;rt;blit=t0();low=!1;samples=[];width=1;height=1;constructor(e){this.renderer=new Jg({canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=It,this.renderer.setClearColor(Sl,1),this.camera=new qt(60,16/9,.08,84),this.rt=new rn(480,270,{magFilter:ot,minFilter:ot,depthBuffer:!0}),this.rt.texture.colorSpace=Zi,this.rt.texture.generateMipmaps=!1,this.rt.texture.magFilter=ot,this.rt.texture.minFilter=ot}setSize(e,t){this.width=Math.max(1,e),this.height=Math.max(1,t),this.renderer.setPixelRatio(1),this.renderer.setSize(this.width,this.height,!1),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.resizeTarget()}setFov(e){this.camera.fov=e,this.camera.updateProjectionMatrix()}noteFrame(e){if(this.samples.push(e),this.samples.length<40)return;const t=this.samples.reduce((s,r)=>s+r,0)/this.samples.length;this.samples=[];const i=t>1/42?!0:t<1/55?!1:this.low;i!==this.low&&(this.low=i,this.resizeTarget())}render(e){this.renderer.setRenderTarget(this.rt),this.renderer.setClearColor(Sl,1),this.renderer.render(e,this.camera),this.renderer.setRenderTarget(null),this.blit.material.uniforms.tDiffuse.value=this.rt.texture,this.renderer.render(this.blit.scene,this.blit.camera)}resizeTarget(){const e=this.width/Math.max(1,this.height),t=this.low?180:270,i=Math.max(160,Math.round(t*e));this.rt.setSize(i,t),this.blit.setSize(i,t)}}let en=null;function Ml(){try{en||(en=new AudioContext),en.state==="suspended"&&en.resume()}catch{en=null}}function i0(n,e=.07,t=.035){if(!(!en||en.state!=="running"))try{const i=en.createOscillator(),s=en.createGain();i.type="square",i.frequency.value=n,s.gain.value=t,i.connect(s),s.connect(en.destination);const r=en.currentTime;s.gain.setValueAtTime(t,r),s.gain.exponentialRampToValueAtTime(1e-4,r+e),i.start(r),i.stop(r+e+.02)}catch{}}function Ba(n,e){const t=document.createElement("canvas");t.width=n,t.height=n;const i=t.getContext("2d");if(!i)throw new Error("canvas");e(i,n);const s=new Vu(t);return s.colorSpace=It,s.magFilter=ot,s.minFilter=ot,s.generateMipmaps=!1,s.wrapS=$i,s.wrapT=$i,s.needsUpdate=!0,s}function s0(){return Ba(64,(n,e)=>{n.fillStyle="#3e5a32",n.fillRect(0,0,e,e);for(let t=0;t<90;t++){n.fillStyle=t%3===0?"#2c4626":t%3===1?"#4d6b3c":"#5d7a3a";const i=t*17%e,s=t*29%e;n.fillRect(i,s,4,5),n.fillRect(i+1,s-2,2,3)}})}function r0(){return Ba(64,(n,e)=>{n.fillStyle="#6b4e36",n.fillRect(0,0,e,e);for(let t=0;t<70;t++)n.fillStyle=t%2?"#7d5c40":"#543824",n.fillRect(t*13%e,t*19%e,5,3);n.fillStyle="#8d8478";for(let t=0;t<16;t++)n.fillRect(t*23%e,t*11%e,2,2);n.fillStyle="#3f6a32";for(let t=0;t<10;t++)n.fillRect(t*29%e,t*7%e,2,3)})}function a0(){return Ba(32,(n,e)=>{n.fillStyle="#2c5834",n.fillRect(0,0,e,e),n.fillStyle="#1e4026";for(let t=0;t<e;t+=4)n.fillRect(0,t,e,1);n.fillStyle="#3e7442";for(let t=2;t<e;t+=6)n.fillRect(t,0,2,e)})}const yl=9148820;function o0(n){const e=[],t=[],i=new z,s=new st,r=new ri,a=new z,o=new z,c=new Be;for(const h of n){const u=(h.geo.index?h.geo.toNonIndexed():h.geo).getAttribute("position");c.set(h.color),a.set(h.x,h.y,h.z),o.set(h.sx??1,h.sy??1,h.sz??1),r.setFromEuler(new Rn(h.rx??0,h.ry??0,h.rz??0)),s.compose(a,r,o);for(let p=0;p<u.count;p++)i.fromBufferAttribute(u,p).applyMatrix4(s),e.push(i.x,i.y,i.z),t.push(c.r,c.g,c.b)}const l=new Ft;return l.setAttribute("position",new et(e,3)),l.setAttribute("color",new et(t,3)),l.computeVertexNormals(),l}function El(n,e){const t=e*Math.PI/180/2,i=7,s=[0,.07,0];for(let o=0;o<=i;o++){const c=-t+o/i*t*2;s.push(Math.sin(c)*n,.07,Math.cos(c)*n)}const r=[];for(let o=1;o<=i;o++)r.push(0,o,o+1);const a=new Ft;return a.setAttribute("position",new et(s,3)),a.setIndex(r),a.computeVertexNormals(),a}function l0(n){return n==="high"?{fill:16769354,edge:1315860}:n==="colorblind"?{fill:3107839,edge:16747038}:{fill:16726831,edge:7213580}}function Xt(n){const e=Math.sin(n*127.1)*43758.5453;return e-Math.floor(e)}function c0(){const n=new rc;n.background=new Be(yl),n.fog=new Da(yl,.032),n.add(new Ju(12043452,3951152,.55)),n.add(new td(7240822,.45));const e=new ed(14017242,1.35);e.position.set(12,22,-8),n.add(e);const t=s0();t.repeat.set(22,16);const i=r0();i.repeat.set(1,1);const s=new Ti({map:t,flatShading:!0}),r=new Ti({map:i,flatShading:!0});ei(s),ei(r);const a=new je(new Di(170,130),s);a.rotation.x=-Math.PI/2,a.position.z=34,n.add(a),n.add(new je(h0(),r));const o=new Ti({vertexColors:!0,flatShading:!0});ei(o);const c=u0();n.add(new je(c.geo,o));const l=new wi(16757082,0,14,1.4);l.position.set(0,4.2,63),n.add(l);const h=new wi(16751162,3.5,7,1.6);h.position.set(Qt.x,1.4,Qt.z);const m=h.clone();m.position.set(jt.x,1.4,jt.z),n.add(h,m);const u=d0();n.add(u);const p=new Map,_=new Map,E=c.colliders;function f(d){let v=p.get(d.id);return v||(v=f0(d.kind),p.set(d.id,v),n.add(v)),v}return{scene:n,colliders:E,update(d,v,b){const y=b?0:Math.sin(v*8);g0(u,d,y);const A=d.assists.telegraphStyle,w=l0(A),g=new Set(d.enemies.map(R=>R.id));for(const[R,U]of p)g.has(R)||(n.remove(U),p.delete(R));for(const R of d.enemies){const U=f(R);if(U.visible=R.alive,!R.alive)continue;U.position.set(R.x,R.y,R.z);const V=U.userData.body;V.rotation.y=R.yaw,R.kind==="gorse"&&(V.position.y=Math.abs(Math.sin(R.hop))*.22),R.kind==="wisp"&&(V.position.y=Math.sin(v*3+R.homeZ)*.08),R.kind==="gatewick"&&(V.position.y=Math.sin(v*1.4)*.06);const D=U.userData.hp;D!==void 0&&R.hp<D&&(U.userData.flash=.12),U.userData.hp=R.hp;const G=U.userData.flash??0;G>0&&(U.userData.flash=Math.max(0,G-.016));const Y=1+Math.max(0,G)*1.4;V.scale.setScalar((R.kind==="gatewick",Y)),m0(U,R,w,v,b);const k=`${R.telegraphShape}:${R.ring}:${Math.round(R.windTotal*100)}`;R.telegraphShape!=="none"&&_.get(R.id)!==k&&i0(R.kind==="gatewick"?180:R.kind==="wisp"?620:360,.09,.03),R.telegraphShape==="none"?_.delete(R.id):_.set(R.id,k)}const M=d.enemies.find(R=>R.kind==="gatewick"),I=u.userData.bossLight;if(M&&M.alive&&d.bossFight&&!I){const R=new wi(16734744,8,9,1.5);R.position.set(0,2.2,56),n.add(R),u.userData.bossLight=R}l.intensity=d.outcome==="clear"?14:.4;const P=d.player.hurtT;u.visible=b||P<=0||Math.floor(P*6)%2===0}}}function h0(){const e=[],t=[],i=[];for(let r=0;r<=96;r++){const a=-4+70*r/96,o=Tn(Math.max(0,Math.min(64,a))),c=.03;e.push(o-2.35,c,a,o+2.35,c,a),t.push(0,r*.45,1,r*.45)}for(let r=0;r<96;r++){const a=r*2;i.push(a,a+2,a+1,a+1,a+2,a+3)}const s=new Ft;return s.setAttribute("position",new et(e,3)),s.setAttribute("uv",new et(t,2)),s.setIndex(i),s.computeVertexNormals(),s}function u0(){const n=new yt(1,1,1,6).toNonIndexed(),e=new is(1,1,6).toNonIndexed(),t=new Gn(1,0).toNonIndexed(),i=new qs(1,6,5).toNonIndexed(),s=new yt(.2,.55,1,5).toNonIndexed(),r=[],a=[];for(let l=0;l<16;l++){const h=-2+l*4.6,m=Tn(Math.max(0,Math.min(60,h))),u=l%2===0?-1:1,p=m+u*(6.2+Xt(l)*2.4),_=1.6+Xt(l+3)*1.8;r.push({geo:i,x:p,y:_*.15,z:h,sx:3.2+Xt(l+1),sy:_,sz:2.6+Xt(l+2),color:l%4===0?6973278:3230252})}for(let l=0;l<14;l++){const h=1+l*4.8,m=Tn(Math.max(0,Math.min(62,h)));for(const u of[-1,1]){if(Xt(l*2+u+8)<.25)continue;const p=m+u*(3.35+Xt(l+u*5)*.8),_=2.4+Xt(l+4)*1.6;r.push({geo:n,x:p,y:.45,z:h,sx:.12,sy:.9,sz:.12,color:5914152}),r.push({geo:e,x:p,y:1.15,z:h,sx:.85,sy:_*.45,sz:.85,color:2312744}),r.push({geo:e,x:p,y:1.85,z:h,sx:.62,sy:_*.4,sz:.62,color:3105332}),r.push({geo:e,x:p,y:2.45,z:h,sx:.38,sy:_*.32,sz:.38,color:3960896}),a.push({x:p,y:1.4,z:h,r:.7})}}for(let l=0;l<10;l++){const h=4+l*6.2,m=Tn(Math.max(0,Math.min(60,h))),u=Xt(l+20)>.5?1:-1,p=m+u*(2.7+Xt(l+21)*1.5);r.push({geo:t,x:p,y:.28,z:h,sx:.45+Xt(l),sy:.32,sz:.4,ry:Xt(l)*3,color:8025452})}let o=0;const c=[3.1,2.5,2.15,1.7,1.45,1.15,.9,.62,.4,.18];for(let l=0;l<c.length;l++){const h=l===c.length-1?2.2:2.6,m=(Xt(l+40)-.5)*.35;r.push({geo:s,x:m,y:o+h/2,z:74,sx:c[l]*1.6,sy:h,sz:c[l]*1.6,ry:l*.4,color:l%2===0?6975080:4153924}),o+=h*.82}a.push({x:0,y:4,z:72,r:3.2}),r.push({geo:n,x:-2.2,y:2.4,z:63.2,sx:.55,sy:4.8,sz:.55,color:7106664}),r.push({geo:n,x:2.2,y:2.4,z:63.2,sx:.55,sy:4.8,sz:.55,color:6449248}),r.push({geo:s,x:0,y:4.7,z:63.2,sx:3.2,sy:.7,sz:.7,color:6054236}),r.push({geo:e,x:0,y:6.3,z:63.2,sx:1.3,sy:2.2,sz:.8,color:5139016});for(const l of Cl)r.push({geo:n,x:l.x,y:1.6,z:l.z,sx:l.r,sy:3.2,sz:l.r,color:6975080}),r.push({geo:n,x:l.x,y:3.3,z:l.z,sx:l.r*1.25,sy:.28,sz:l.r*1.25,color:8156520}),a.push({x:l.x,y:1.6,z:l.z,r:l.r+.25});return bl(r,Qt.x,Qt.z),bl(r,jt.x,jt.z),r.push({geo:new yt(1,1,1,10).toNonIndexed(),x:Lt.x,y:.02,z:Lt.z,sx:8.2,sy:.08,sz:8.2,color:6053980}),{geo:o0(r),colliders:a}}function bl(n,e,t){const i=new yt(1,1,1,7).toNonIndexed(),s=new yt(.15,.15,1,4).toNonIndexed();n.push({geo:i,x:e,y:.28,z:t,sx:.7,sy:.5,sz:.7,color:7236194}),n.push({geo:s,x:e-.28,y:.85,z:t,sx:1,sy:.7,sz:1,color:6965804}),n.push({geo:s,x:e+.28,y:.85,z:t,sx:1,sy:.7,sz:1,color:6965804}),n.push({geo:s,x:e,y:1.25,z:t,sx:2.6,sy:.7,sz:1,rx:Math.PI/2,color:8018484})}function d0(){const n=new bn,e=new yt(.22,.52,1.2,7),t=new Ti({map:a0(),flatShading:!0});ei(t);const i=new je(e,t);i.position.y=.75;const s=new je(new yt(.16,.18,.28,6),Yt(12886140));s.position.y=1.48;const r=new je(new yt(.18,.2,.16,6),Yt(5912614));r.position.y=1.66;const a=new je(new yt(.07,.08,.32,5),Yt(4863012));a.position.set(-.12,.16,.02);const o=new je(new yt(.07,.08,.32,5),Yt(4863012));o.position.set(.12,.16,-.02);const c=new bn;c.position.set(.5,.92,.18);const l=new je(new yt(.06,.07,.34,5),Yt(2772528));l.position.y=-.12;const h=new bn;h.position.set(.1,-.22,.28);const m=new je(new yt(.1,.11,.22,5),Yt(2761756)),u=new je(new yt(.055,.055,.1,5),yn(16762218));u.position.z=.06,h.add(m,u);const p=new wi(16756832,22,9,1.6);p.position.y=.02,h.add(p),c.add(l,h);const _=yn(16762218,.13);_.side=hn;const E=new je(new is(.45,3.4,6,1,!0),_);return E.rotation.x=Math.PI/2,E.position.set(.36,.7,1.55),n.add(i,s,r,a,o,c,E),n.userData={legL:a,legR:o,arm:c,cloak:i,beam:E},n}function f0(n){const e=new bn,t=new bn;if(n==="gorse")t.add(Fn(new Gn(.46,0),Yt(3107378),0,.48,0)),t.add(Fn(new Gn(.32,0),Yt(4160058),.24,.62,.08)),t.add(Fn(new Gn(.28,0),Yt(2381352),-.2,.55,-.06));else if(n==="wisp"){t.add(Fn(new Gn(.28,0),yn(15268863),0,0,0));const o=Fn(new Gn(.46,0),yn(10475263,.4),0,0,0);t.add(o);const c=new wi(13625599,4,4,2);t.add(c)}else{const o=new Wi(1.15,0),c=p0(o),l=new Ti({vertexColors:!0,flatShading:!0});ei(l);const h=new je(c,l);h.scale.set(1.25,1.45,1.05),h.position.y=1.7,t.add(h),t.add(Fn(new is(.5,1.15,5),Yt(8159878),0,3.15,0));const m=Fn(new Wi(.48,0),Yt(6580846),-1.35,1.85,.15);m.scale.set(.75,1.35,.65);const u=Fn(new Wi(.48,0),Yt(6580846),1.4,1.7,-.1);u.scale.set(.7,1.2,.6),t.add(m,u);const p=yn(16733204),_=[[.2,1.9,.7,.05,.9,.05],[-.45,1.55,.55,.7,.05,.05],[.35,2.35,.45,.05,.55,.05],[-.1,1.25,-.2,.04,.6,.05]];for(const[f,d,v,b,y,A]of _){const w=new je(new yt(1,1,1,4),p);w.position.set(f,d,v),w.scale.set(b,y,A),w.rotation.z=f,t.add(w)}const E=new wi(16734744,6,6,1.8);E.position.set(0,1.8,.4),t.add(E)}e.add(t);const i=new je(new qs(1,10,2),yn(16726831,.33));i.scale.set(1,.02,1);const s=new je(new Ua(.86,1,18),yn(7213580,.95));s.rotation.x=-Math.PI/2;const r=new je(El(1,60),yn(16726831,.38)),a=new je(El(1,90),yn(16726831,.38));for(const o of[i,s,r,a])o.visible=!1,e.add(o);return e.userData={body:t,disk:i,ring:s,cone:r,coneWide:a,hp:-1,flash:0},e}function Fn(n,e,t,i,s){const r=new je(n,e);return r.position.set(t,i,s),r}function p0(n){const e=n.toNonIndexed(),t=e.getAttribute("position"),i=new Float32Array(t.count*3),s=new Be(6975092),r=new Be(16731412);for(let a=0;a<t.count;a+=3){let o=!1;for(let l=0;l<3;l++){const h=t.getX(a+l),m=t.getY(a+l);Math.abs(Math.sin(h*3.1+m*5.4))>.94&&(o=!0)}const c=o?r:s;for(let l=0;l<3;l++)i[(a+l)*3]=c.r,i[(a+l)*3+1]=c.g,i[(a+l)*3+2]=c.b}return e.setAttribute("color",new et(i,3)),e.computeVertexNormals(),e}function m0(n,e,t,i,s){const r=n.userData.disk,a=n.userData.ring,o=n.userData.cone,c=n.userData.coneWide,l=e.telegraphShape!=="none",h=s?.85:.55+Math.abs(Math.sin(i*14))*.45;r.visible=l&&e.telegraphShape==="circle",a.visible=r.visible,o.visible=l&&e.telegraphShape==="cone"&&e.telegraphCone<=70,c.visible=l&&e.telegraphShape==="cone"&&e.telegraphCone>70;const m=e.markX-e.x,u=e.markZ-e.z;if(r.visible){r.position.set(m,.08,u),a.position.set(m,.1,u);const _=e.telegraphR;r.scale.set(_,.04,_),a.scale.setScalar(_),Rr(r,t.fill,h*.55),Rr(a,t.edge,.95)}const p=o.visible?o:c;p.visible&&(p.position.set(0,0,0),p.rotation.y=e.yaw,p.scale.setScalar(e.telegraphLen),Rr(p,t.fill,.28+h*.35))}function Rr(n,e,t){const i=n.material;i.color.setHex(e),i.opacity=t,i.transparent=!0,i.depthWrite=!1}function g0(n,e,t){const i=e.player;n.position.set(i.x,i.y,i.z),n.rotation.y=i.yaw;const s=n.userData.legL,r=n.userData.legR,a=n.userData.arm,o=i.moving&&!i.dodging;s.rotation.x=o?t*.7:0,r.rotation.x=o?-t*.7:0,n.position.y=i.y+(o?Math.abs(t)*.05:0),i.dodging?n.rotation.z=i.dodgeDx*.15:n.rotation.z=0;const c=i.attack.phase==="windup"?-.8:i.attack.phase==="active"?1.1:i.attack.phase==="recovery"?.4:0;a.rotation.x=c;const l=n.userData.beam;l.visible=i.flaring;const h=l.material;h.opacity=.28}const Cr='<svg viewBox="0 0 9 8" class="heart" aria-hidden="true"><path d="M1 1h2v1H2v1H1zm5 0h2v2H7V2H6zM2 2h5v1H2zM1 3h7v1H1zM2 4h5v1H2zM3 5h3v1H3zM4 6h1v1H4z"/></svg>';class _0{root;toastT=0;constructor(e){this.root=document.createElement("div"),this.root.id="hud",this.root.innerHTML=`
      <div class="hud-left">
        <div class="hearts" id="hearts" role="img" aria-label="HP"></div>
        <div class="oil-row">
          <span class="lantern" aria-hidden="true"></span>
          <div class="oil" id="oil" role="img" aria-label="${ue.oil}"></div>
        </div>
      </div>
      <div class="hud-right touch-only">
        <button type="button" id="hud-pause" class="chip">${ue.pause}</button>
        <button type="button" id="hud-lock" class="chip">${ue.lockOn}</button>
      </div>
      <div id="bossbar" hidden>
        <span>${ue.bossName}</span>
        <div class="meter"><div id="bossfill"></div></div>
      </div>
      <p id="prompt" role="status"></p>
      <p id="toast" role="status"></p>
      <div id="reticle" hidden></div>
    `,e.appendChild(this.root);const t=this.root.querySelector("#hearts");t.innerHTML=Cr+Cr+Cr;const i=this.root.querySelector("#oil");i.innerHTML=Array.from({length:10},()=>"<i></i>").join("")}bind(e,t){this.root.querySelector("#hud-pause").addEventListener("click",e),this.root.querySelector("#hud-lock").addEventListener("click",t)}toast(e){const t=this.root.querySelector("#toast");t.textContent=e,this.toastT=2.4}update(e,t){const i=[...this.root.querySelectorAll("#hearts .heart")],s=e.player.hp;i.forEach((p,_)=>{const E=p;E.classList.remove("off","half"),!(s>=_+1)&&(s>=_+.5?E.classList.add("half"):E.classList.add("off"))}),this.root.querySelector("#hearts").setAttribute("aria-label",`${ue.hp} ${s.toFixed(1)} / 3`);const a=[...this.root.querySelectorAll("#oil i")],o=Math.round(e.player.oil/10);a.forEach((p,_)=>p.classList.toggle("on",_<o)),this.root.querySelector("#oil").setAttribute("aria-label",`${ue.oil} ${Math.round(e.player.oil)}`);const c=e.enemies.find(p=>p.kind==="gatewick"),l=this.root.querySelector("#bossbar"),h=!!c&&c.alive&&e.bossFight;l.hidden=!h,c&&h&&(this.root.querySelector("#bossfill").style.width=`${c.hp/c.maxHp*100}%`);const m=this.root.querySelector("#prompt");m.textContent=e.promptT>0?e.prompt:"";const u=this.root.querySelector("#reticle");u.hidden=!e.lockId,this.toastT>0&&(this.toastT=Math.max(0,this.toastT-t),this.toastT===0&&(this.root.querySelector("#toast").textContent=""))}}class x0{root;constructor(e,t){this.root=document.createElement("div"),this.root.id="touch",this.root.innerHTML=`
      <div id="lookpad" aria-hidden="true"></div>
      <div id="stick" class="stick">
        <div id="knob"></div>
        <span>${ue.move}</span>
      </div>
      <div class="actions">
        <button type="button" id="btn-lamp" class="round lamp" aria-label="${ue.lamp}">L</button>
        <button type="button" id="btn-dodge" class="round dodge" aria-label="${ue.dodge}">D</button>
        <button type="button" id="btn-attack" class="round attack" aria-label="${ue.attack}">A</button>
      </div>
      <div id="rotate" role="status">${ue.rotate}</div>
    `,e.appendChild(this.root);const i=this.root.querySelector("#stick"),s=this.root.querySelector("#knob"),r=46;let a=-1;const o=(f,d)=>{s.style.transform=`translate(${f}px, ${d}px)`};i.addEventListener("pointerdown",f=>{a=f.pointerId,i.setPointerCapture(f.pointerId),t.touch.down=!0,f.preventDefault()}),i.addEventListener("pointermove",f=>{if(f.pointerId!==a)return;const d=i.getBoundingClientRect();let v=f.clientX-(d.left+d.width/2),b=f.clientY-(d.top+d.height/2);const y=Math.hypot(v,b)||1;y>r&&(v=v/y*r,b=b/y*r),o(v,b),t.touch.x=v/r,t.touch.y=-b/r,t.touch.down=!0});const c=f=>{f.pointerId===a&&(a=-1,t.touch.down=!1,t.touch.x=0,t.touch.y=0,o(0,0))};i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c),((f,d)=>{const v=this.root.querySelector(f);v.addEventListener("pointerdown",y=>{y.preventDefault(),t.touch[d]=!0});const b=()=>{t.touch[d]=!1};v.addEventListener("pointerup",b),v.addEventListener("pointercancel",b),v.addEventListener("pointerleave",b)})("#btn-attack","attack");const h=(f,d)=>{this.root.querySelector(f).addEventListener("pointerdown",v=>{v.preventDefault(),t.touch[d]=!0})};h("#btn-dodge","dodge"),h("#btn-lamp","flare");const m=this.root.querySelector("#lookpad");let u=-1,p=0,_=0;m.addEventListener("pointerdown",f=>{u=f.pointerId,p=f.clientX,_=f.clientY,m.setPointerCapture(f.pointerId),t.touch.look=!0,f.preventDefault()}),m.addEventListener("pointermove",f=>{f.pointerId===u&&(t.touch.lookX+=f.clientX-p,t.touch.lookY+=f.clientY-_,p=f.clientX,_=f.clientY,t.touch.look=!0)});const E=f=>{f.pointerId===u&&(u=-1,t.touch.look=!1)};m.addEventListener("pointerup",E),m.addEventListener("pointercancel",E)}}const Rc="lampkeep.v3.slice",v0=["spawn","trail_shrine","gate_threshold","cleared"],S0=["amber","high","colorblind"];function M0(){return{v:1,checkpointId:"spawn",assists:{...Ma},bindings:{},fov:60,reducedMotion:null,textureWobble:!1,updatedAt:new Date().toISOString()}}function Tl(){const n=new Map;return{getItem:e=>n.get(e)??null,setItem:(e,t)=>void n.set(e,t),removeItem:e=>void n.delete(e)}}function za(){try{if(typeof localStorage>"u")return Tl();const n="__lampkeep_probe";return localStorage.setItem(n,"1"),localStorage.removeItem(n),localStorage}catch{return Tl()}}function y0(n,e=za()){e.setItem(Rc,JSON.stringify(n))}function E0(n=za()){const e=n.getItem(Rc);if(!e)return null;try{const t=JSON.parse(e);if(t.v!==1||!t.checkpointId||!v0.includes(t.checkpointId))return null;const i={...Ma,...t.assists??{}};S0.includes(i.telegraphStyle)||(i.telegraphStyle="amber");const s=typeof t.fov=="number"?Math.max(50,Math.min(75,t.fov)):60;return{v:1,checkpointId:t.checkpointId,assists:i,bindings:t.bindings??{},fov:s,reducedMotion:typeof t.reducedMotion=="boolean"?t.reducedMotion:null,textureWobble:t.textureWobble===!0,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:new Date().toISOString()}}catch{return null}}function wl(n){return!!n&&n.checkpointId!=="spawn"}function Al(n){return{...Nl,...n??{}}}class b0{screen="title";returnTo="title";save;sim;pipeline;view;rig;input;hud;screenRoot;listening=null;hold=!1;demo;forceTouch;acc=0;last=performance.now();viewTime=0;fps=60;systemReduced=!1;webglOk=!0;constructor(){this.save=E0()??M0(),this.sim=new Th(this.save.assists);const e=document.querySelector("#view");this.screenRoot=document.querySelector("#ui"),this.screenRoot.innerHTML=`<div id="screen"></div><p id="boot" class="panel" role="status">${ue.loading}</p>`;try{this.pipeline=new n0(e),this.view=c0(),this.webglOk=!0}catch(s){console.error(s),this.webglOk=!1,this.pipeline=null,this.view=null}this.rig=this.webglOk?new Lh(this.pipeline.camera):null,this.input=new Dh(e,()=>Al(this.save.bindings)),this.hud=new _0(document.body),new x0(document.body,this.input),this.hud.bind(()=>{this.input.touch.pause=!0},()=>{this.input.touch.lock=!0});const t=new URLSearchParams(location.search);if(this.demo=t.has("demo"),this.forceTouch=t.has("touch"),this.systemReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches,window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",s=>{this.systemReduced=s.matches}),window.addEventListener("pointerdown",Ml,{once:!0}),window.addEventListener("keydown",Ml,{once:!0}),window.addEventListener("resize",()=>this.resize()),this.resize(),this.show("title"),this.webglOk)document.querySelector("#boot")?.remove(),requestAnimationFrame(this.frame),this.demo&&this.begin();else{const s=document.querySelector("#boot");s&&(s.textContent=ue.webglError)}const i={get screen(){return Mn.screen},get player(){return{x:Mn.sim.player.x,z:Mn.sim.player.z,hp:Mn.sim.player.hp,yaw:Mn.sim.player.yaw}},get fps(){return Mn.fps},get outcome(){return Mn.sim.outcome},stage:s=>Mn.stage(s),fast:s=>Mn.fast(s)};window.__LAMPKEEP=i}start(){}frame=e=>{const t=Math.min(.05,(e-this.last)/1e3);this.last=e,this.viewTime+=t,this.fps=this.fps*.9+1/Math.max(t,.001)*.1;const i=this.reducedNow(),s=this.screen==="play"&&this.sim.outcome==="play"&&!this.hold&&this.webglOk,r=this.input.sample(t,s,i);if(r.pause&&this.onPause(),s){this.acc+=t;let o=!0,c=0;for(;this.acc>=1/60&&c++<5;){const l=this.demo?Eo(this.sim):o?Rl(r):{...Rl(r),lookX:0,lookY:0,dodge:!1,flare:!1,lockOn:!1,interact:!1},h=this.sim.checkpoint;this.sim.step(1/60,l),this.sim.checkpoint!==h&&this.rememberCheckpoint(this.sim.checkpoint),this.acc-=1/60,o=!1}this.sim.outcome==="clear"?(this.rememberCheckpoint("cleared"),this.show("ending")):this.sim.outcome==="dead"&&this.show("dead")}if(!this.webglOk)return;this.screen!=="play"&&this.screen!=="pause"&&this.screen!=="dead"&&!i?this.rig.sway=Math.sin(this.viewTime*.28)*.42:this.rig.dampSway(0,t),this.rig.update(this.sim,this.view.colliders,t),this.view.update(this.sim,this.viewTime,i),Qg({snap:!i,wobble:this.save.textureWobble&&!i}),this.pipeline.setFov(this.save.fov),this.pipeline.noteFrame(t),this.pipeline.render(this.view.scene),(this.screen==="play"||this.screen==="pause")&&this.hud.update(this.sim,t),this.input.consumePadLost()&&this.hud.toast(ue.padLost),requestAnimationFrame(this.frame)};resize(){this.webglOk&&this.pipeline.setSize(window.innerWidth,window.innerHeight);const e=window.innerHeight>window.innerWidth&&window.innerWidth<760,t=this.forceTouch||window.matchMedia("(pointer: coarse)").matches||window.innerWidth<=900;document.body.classList.toggle("is-portrait",e),document.body.classList.toggle("touch-ui",t),document.body.classList.toggle("force-touch",this.forceTouch)}show(e){(e==="settings"||e==="controls"||e==="about"||e==="story")&&(this.screen==="title"||this.screen==="pause"||this.screen==="ending"||this.screen==="dead")&&(this.returnTo=this.screen),this.screen=e,document.body.classList.remove("mode-title","mode-controls","mode-play","mode-pause","mode-settings","mode-about","mode-story","mode-ending","mode-dead"),document.body.classList.add(`mode-${e}`);const t=document.querySelector("#screen"),i={screen:e,canContinue:wl(this.save),assistsOn:this.save.assists.master,assists:this.save.assists,bindings:Al(this.save.bindings),fov:this.save.fov,textureWobble:this.save.textureWobble,reduced:this.save.reducedMotion===null?"auto":this.save.reducedMotion?"on":"off",listening:this.listening};t.innerHTML=Rh(i),this.bind(t),t.querySelector("button")?.focus()}bind(e){const t=(s,r)=>{e.querySelector(`#${s}`)?.addEventListener("click",r)};t("begin",()=>this.begin()),t("continue",()=>this.continue()),t("controls",()=>this.show("controls")),t("settings",()=>this.show("settings")),t("about",()=>this.show("about")),t("story",()=>this.show("story")),t("back",()=>this.show(this.returnTo)),t("resume",()=>this.show("play")),t("title-btn",()=>{this.hold=!1,this.show("title")}),t("retry",()=>{this.sim.respawn(),this.sim.setAssists(this.save.assists),this.hold=!1,this.show("play")}),t("reset",()=>{this.save.checkpointId="spawn",this.persist(),this.show("settings")});const i=(s,r)=>{e.querySelector(`#${s}`)?.addEventListener("change",a=>{const o=a.target.checked;(r==="master"||r==="damageAssist"||r==="extraIframes"||r==="softLock"||r==="cameraRecenter"||r==="showPrompts"||r==="slowCombat")&&(this.save.assists={...this.save.assists,[r]:o},this.sim.setAssists(this.save.assists),this.persist())})};i("assist-master","master"),i("assist-damage","damageAssist"),i("assist-dodge","extraIframes"),i("assist-soft","softLock"),i("assist-recenter","cameraRecenter"),i("assist-prompts","showPrompts"),i("assist-slow","slowCombat"),e.querySelector("#wobble")?.addEventListener("change",s=>{this.save.textureWobble=s.target.checked,this.persist()}),e.querySelector("#telegraph")?.addEventListener("change",s=>{this.save.assists={...this.save.assists,telegraphStyle:s.target.value},this.sim.setAssists(this.save.assists),this.persist()}),e.querySelector("#reduced")?.addEventListener("change",s=>{const r=s.target.value;this.save.reducedMotion=r==="auto"?null:r==="on",this.persist()}),e.querySelector("#fov")?.addEventListener("input",s=>{this.save.fov=Number(s.target.value);const r=e.querySelector("label[for=fov]");r&&(r.firstChild.textContent=ue.fovValue(this.save.fov)),this.persist()}),e.querySelectorAll("[data-bind]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.bind;this.listening=r,this.show("settings"),this.input.capture=a=>{if(this.listening=null,a!=="Escape"){const o=r==="attack"?[a,"mouse0"]:r==="lockOn"?[a,"mouse2"]:[a];this.save.bindings={...this.save.bindings,[r]:o},this.persist()}this.show("settings")}})})}begin(){this.webglOk&&(this.sim.reset(),this.sim.setAssists(this.save.assists),this.hold=!1,this.acc=0,this.show("play"))}continue(){if(!(!wl(this.save)||!this.webglOk)){if(this.save.checkpointId==="cleared"){this.sim.loadCheckpoint("cleared"),this.show("ending");return}this.sim.loadCheckpoint(this.save.checkpointId),this.sim.setAssists(this.save.assists),this.hold=!1,this.show("play")}}onPause(){this.input.capture||(this.screen==="play"?this.show("pause"):this.screen==="pause"?this.show("play"):(this.screen==="settings"||this.screen==="controls"||this.screen==="about"||this.screen==="story")&&this.show(this.returnTo))}rememberCheckpoint(e){e!=="spawn"&&(this.save.checkpointId=e,this.persist())}persist(){this.save.updatedAt=new Date().toISOString(),y0(this.save,za())}reducedNow(){return this.save.reducedMotion===null?this.systemReduced:this.save.reducedMotion}stage(e){if(this.webglOk){if(this.sim.reset(),this.sim.setAssists({...Ma,...this.save.assists}),this.hold=!0,e==="road"){const t=this.sim.enemies[0],i=this.sim.enemies[1];this.sim.player.x=Tn(4.2),this.sim.player.z=4.2,this.sim.player.yaw=0,this.sim.cameraYaw=0,this.sim.cameraPitch=.18;for(const s of[t,i])s.state="telegraph",s.telegraphShape="circle",s.telegraphR=1.1,s.markX=s.x,s.markZ=s.z,s.windLeft=.5,s.windTotal=.55;this.sim.prompt=ue.promptGorse,this.sim.promptT=30}else{for(const i of this.sim.enemies)i.kind!=="gatewick"&&(i.alive=!1);const t=this.sim.enemies.find(i=>i.kind==="gatewick");t.hp=9,t.state="telegraph",t.telegraphShape="circle",t.telegraphR=3.2,t.markX=t.x,t.markZ=t.z,t.windLeft=.6,t.windTotal=.7,this.sim.player.x=0,this.sim.player.z=52.2,this.sim.player.yaw=0,this.sim.cameraYaw=0,this.sim.cameraPitch=.16,this.sim.bossFight=!0,this.sim.prompt=ue.bossIntro,this.sim.promptT=30,this.sim.visitedTrail=!0,this.sim.visitedGate=!0}this.show("play"),this.webglOk&&(this.view.update(this.sim,this.viewTime,this.reducedNow()),this.rig.sway=0,this.rig.snap=!0,this.rig.update(this.sim,this.view.colliders,.016),this.pipeline.render(this.view.scene),this.hud.update(this.sim,0))}}fast(e){if(!this.webglOk)return;this.hold=!1,this.show("play");const t=Math.round(e*60);for(let i=0;i<t&&this.sim.outcome==="play";i++)this.sim.step(1/60,Eo(this.sim));this.view.update(this.sim,this.viewTime,!1),this.rig.update(this.sim,this.view.colliders,.05),this.pipeline.render(this.view.scene)}}function Rl(n){return{moveX:n.moveX,moveY:n.moveY,lookX:n.lookX,lookY:n.lookY,attack:n.attack,dodge:n.dodge,flare:n.flare,lockOn:n.lockOn,interact:n.interact,slow:n.slow}}const Mn=new b0;
