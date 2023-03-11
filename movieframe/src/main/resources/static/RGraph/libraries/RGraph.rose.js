'version:2023-02-25 (6.11)';RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.Effects=RGraph.Effects||{};RGraph.Effects.Rose=RGraph.Effects.Rose||{};RGraph.Rose=function(conf)
{this.id=conf.id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.data=conf.data;this.canvas.__object__=this;this.type='rose';this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.uid=RGraph.createUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.createUID();this.colorsParsed=false;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.stopAnimationRequested=false;this.centerx=0;this.centery=0;this.radius=0;this.max=0;this.angles=[];this.angles2=[];this.properties={axes:false,axesColor:'black',axesLinewidth:1,axesTickmarks:true,backgroundGrid:true,backgroundGridColor:'#ccc',backgroundGridSize:null,backgroundGridRadialsCount:null,backgroundGridRadialsOffset:0,backgroundGridCirclesCount:5,centerx:null,centery:null,radius:null,anglesStart:0,linewidth:1,colors:['rgba(255,0,0,0.5)','rgba(255,255,0,0.5)','rgba(0,255,255,0.5)','rgb(0,255,0)','gray','blue','rgb(255,128,255)','green','pink','gray','aqua'],colorsSequential:false,colorsAlpha:null,colorsStroke:'rgba(0,0,0,0)',margin:5,marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,shadow:false,shadowColor:'#aaa',shadowOffsetx:0,shadowOffsety:0,shadowBlur:15,title:'',titleBold:null,titleFont:null,titleSize:null,titleItalic:null,titleColor:null,titleX:null,titleY:null,titleHalign:null,titleValign:null,titleOffsetx:0,titleOffsety:0,titleSubtitle:'',titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,titleSubtitleOffsetx:0,titleSubtitleOffsety:0,labels:null,labelsFormattedDecimals:0,labelsFormattedPoint:'.',labelsFormattedThousand:',',labelsFormattedUnitsPre:'',labelsFormattedUnitsPost:'',labelsColor:null,labelsFont:null,labelsSize:null,labelsBold:null,labelsItalic:null,labelsPosition:'center',labelsBoxed:false,labelsOffsetRadius:0,labelsAxes:'n',labelsAxesFont:null,labelsAxesSize:null,labelsAxesColor:null,labelsAxesBold:null,labelsAxesItalic:null,labelsAxesCount:5,labelsAxesOffsetx:0,labelsAxesOffsety:0,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,textAccessible:false,textAccessibleOverflow:'visible',textAccessiblePointerevents:false,text:null,key:null,keyBackground:'white',keyPosition:'graph',keyHalign:'right',keyShadow:false,keyShadowColor:'#666',keyShadowBlur:3,keyShadowOffsetx:2,keyShadowOffsety:2,keyPositionGutterBoxed:false,keyPositionX:null,keyPositionY:null,keyColorShape:'square',keyRounded:true,keyLinewidth:1,keyColors:null,keyInteractive:false,keyInteractiveHighlightChartStroke:'black',keyInteractiveHighlightChartFill:'rgba(255,255,255,0.7)',keyInteractiveHighlightLabel:'rgba(255,0,0,0.2)',keyLabelsColor:null,keyLabelsFont:null,keyLabelsSize:null,keyLabelsBold:null,keyLabelsItalic:null,keyLabelsOffsetx:0,keyLabelsOffsety:0,contextmenu:null,tooltips:null,tooltipsEvent:'onclick',tooltipsEffect:'slide',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsHighlight:true,tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedListType:'ul',tooltipsFormattedListItems:null,tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',annotatable:false,annotatableColor:'black',annotatableLinewidth:1,resizable:false,resizableHandleAdjust:[0,0],resizableHandleBackground:null,adjustable:false,scaleMax:null,scaleMin:0,scaleDecimals:null,scalePoint:'.',scaleThousand:',',scaleUnitsPre:'',scaleUnitsPost:'',variant:'stacked',variantThreedDepth:10,exploded:0,animationRoundrobinFactor:1,animationRoundrobinRadius:true,animationGrowMultiplier:1,segmentHighlight:false,segmentHighlightCount:null,segmentHighlightFill:'rgba(0,255,0,0.5)',segmentHighlightStroke:'rgba(0,0,0,0)',clearto:'rgba(0,0,0,0)'}
this.data=RGraph.stringsToNumbers(this.data);var linear_data=RGraph.arrayLinearize(this.data);this.data_seq=linear_data;this.data_arr=linear_data;for(var i=0;i<linear_data.length;++i){this["$"+i]={};}
var properties=this.properties;this.path=RGraph.pathObjectFunction;if(RGraph.Effects&&typeof RGraph.Effects.decorate==='function'){RGraph.Effects.decorate(this);}
this.responsive=RGraph.responsive;this.set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(name==='labelsOffset'){name='labelsOffsetRadius';}
if(arguments.length===1&&typeof arguments[0]==='object'){for(i in arguments[0]){if(typeof i==='string'){this.set(i,arguments[0][i]);}}
return this;}
properties[name]=value;return this;};this.get=function(name)
{if(name==='labelsOffset'){name='labelsOffsetRadius';}
return properties[name];};this.draw=function()
{RGraph.fireCustomEvent(this,'onbeforedraw');if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
this.marginLeft=properties.marginLeft;this.marginRight=properties.marginRight;this.marginTop=properties.marginTop;this.marginBottom=properties.marginBottom;this.radius=(Math.min(this.canvas.width-this.marginLeft-this.marginRight,this.canvas.height-this.marginTop-this.marginBottom)/2);this.centerx=((this.canvas.width-this.marginLeft-this.marginRight)/2)+this.marginLeft;this.centery=((this.canvas.height-this.marginTop-this.marginBottom)/2)+this.marginTop;this.angles=[];this.angles2=[];this.total=0;this.startRadians=properties.anglesStart;this.coordsText=[];if(properties.key&&properties.key.length>0&&properties.key.length>=3){this.centerx=this.centerx-this.marginRight+5;}
if(typeof properties.centerx=='number')this.centerx=properties.centerx;if(typeof properties.centery=='number')this.centery=properties.centery;if(typeof properties.radius=='number')this.radius=properties.radius;if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
if(properties.variant.indexOf('3d')!==-1){var scaleX=1.5;this.context.setTransform(scaleX,0,0,1,(this.canvas.width*scaleX-this.canvas.width)* -0.5,0);}
this.drawBackground();if(properties.variant.indexOf('3d')!==-1){RGraph.setShadow(this,'rgba(0,0,0,0.35)',0,15,25);for(var i=properties.variantThreedDepth;i>0;i-=1){this.centery-=1;this.drawRose({storeAngles:false});RGraph.noShadow(this);for(var j=0,len=this.angles.length;j<len;j+=1){var a=this.angles[j];this.path('b m % % a % % % % % false c f rgba(0,0,0,0.1) c f rgba(0,0,0,0.1)',a[4],a[5],a[4],a[5],a[3]+1.5,a[0]-0.01,a[1]+0.01,false);}}}
this.drawRose();this.drawLabels();this.context.strokeStyle='rgba(0,0,0,0)'
if(properties.contextmenu){RGraph.showContext(this);}
if(properties.adjustable){RGraph.allowAdjusting(this);}
RGraph.addCustomText(this);RGraph.installEventListeners(this);if(properties.segmentHighlight){if(!RGraph.allowSegmentHighlight){alert('[WARNING] The segment highlight function does not exist - have you included the dynamic library?');}
RGraph.allowSegmentHighlight({object:this,count:typeof properties.segmentHighlightCount==='number'?properties.segmentHighlightCount:this.data.length,fill:properties.segmentHighlightFill,stroke:properties.segmentHighlightStroke});}
if(this.firstDraw){this.firstDraw=false;RGraph.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RGraph.fireCustomEvent(this,'ondraw');return this;};this.exec=function(func)
{func(this);return this;};this.drawBackground=function()
{this.context.lineWidth=1;if(properties.backgroundGridCirclesCount){if(typeof properties.backgroundGridCirclesCount=='number'){properties.backgroundGridCirclesSize=this.radius/properties.backgroundGridCirclesCount;}
this.context.beginPath();this.context.strokeStyle=properties.backgroundGridColor;for(var i=properties.backgroundGridCirclesSize;i<=this.radius;i+=properties.backgroundGridCirclesSize){this.context.moveTo(this.centerx+i,this.centery);this.context.arc(this.centerx,this.centery,i,0,RGraph.TWOPI,false);}
this.context.stroke();this.context.beginPath();if(typeof properties.backgroundGridRadialsCount!=='number'){properties.backgroundGridRadialsCount=this.data.length}
if(properties.backgroundGridRadialsCount>0){var num=(360/properties.backgroundGridRadialsCount);var offset=properties.backgroundGridRadialsOffset;for(var i=0;i<=360;i+=num){this.context.arc(this.centerx,this.centery,this.radius,((i/(180/RGraph.PI))-RGraph.HALFPI)+this.startRadians+offset,(((i+0.0001)/(180/RGraph.PI))-RGraph.HALFPI)+this.startRadians+offset,false);this.context.lineTo(this.centerx,this.centery);}
this.context.stroke();}}
if(properties.axes){this.context.beginPath();this.context.strokeStyle=properties.axesColor;this.context.lineWidth=properties.axesLinewidth;this.context.moveTo(this.centerx-this.radius,Math.round(this.centery));this.context.lineTo(this.centerx+this.radius,Math.round(this.centery));if(properties.axesTickmarks){this.context.moveTo(Math.round(this.centerx-this.radius),this.centery-5);this.context.lineTo(Math.round(this.centerx-this.radius),this.centery+5);this.context.moveTo(Math.round(this.centerx+this.radius),this.centery-5);this.context.lineTo(Math.round(this.centerx+this.radius),this.centery+5);for(var i=(this.centerx-this.radius);i<(this.centerx+this.radius);i+=(this.radius/5)){this.context.moveTo(Math.round(i),this.centery-3);this.context.lineTo(Math.round(i),this.centery+3.5);}
for(var i=(this.centery-this.radius);i<(this.centery+this.radius);i+=(this.radius/5)){this.context.moveTo(this.centerx-3,Math.round(i));this.context.lineTo(this.centerx+3,Math.round(i));}}
this.context.moveTo(Math.round(this.centerx),this.centery-this.radius);this.context.lineTo(Math.round(this.centerx),this.centery+this.radius);if(properties.axesTickmarks){this.context.moveTo(this.centerx-5,Math.round(this.centery-this.radius));this.context.lineTo(this.centerx+5,Math.round(this.centery-this.radius));this.context.moveTo(this.centerx-5,Math.round(this.centery+this.radius));this.context.lineTo(this.centerx+5,Math.round(this.centery+this.radius));}
this.context.closePath();this.context.stroke();}
this.path('b c');};this.drawRose=function()
{var max=0,data=this.data,margin=RGraph.toRadians(properties.margin),opt=arguments[0]||{};this.context.lineWidth=properties.linewidth;if(RGraph.isNull(properties.scaleMax)){for(var i=0;i<data.length;++i){if(typeof data[i]=='number'){max=Math.max(max,data[i]);}else if(typeof data[i]=='object'&&properties.variant.indexOf('non-equi-angular')!==-1){max=Math.max(max,data[i][0]);}else{max=Math.max(max,RGraph.arraySum(data[i]));}}
this.scale2=RGraph.getScale({object:this,options:{'scale.max':max,'scale.min':0,'scale.thousand':properties.scaleThousand,'scale.point':properties.scalePoint,'scale.decimals':properties.scaleDecimals,'scale.labels.count':properties.labelsAxesCount,'scale.round':properties.scaleRound,'scale.units.pre':properties.scaleUnitsPre,'scale.units.post':properties.scaleUnitsPost}});this.max=this.scale2.max;}else{var ymax=properties.scaleMax;this.scale2=RGraph.getScale({object:this,options:{'scale.max':ymax,'scale.strict':true,'scale.thousand':properties.scaleThousand,'scale.point':properties.scalePoint,'scale.decimals':properties.scaleDecimals,'scale.labels.count':properties.labelsAxesCount,'scale.round':properties.scaleRound,'scale.units.pre':properties.scaleUnitsPre,'scale.units.post':properties.scaleUnitsPost}});this.max=this.scale2.max}
this.sum=RGraph.arraySum(data);this.context.moveTo(this.centerx,this.centery);this.context.stroke();if(properties.colorsAlpha){this.context.globalAlpha=properties.colorsAlpha;}
var sequentialIndex=0;if(typeof properties.variant=='string'&&properties.variant.indexOf('non-equi-angular')!==-1){var total=0;for(var i=0;i<data.length;++i){total+=data[i][1];}
if(properties.shadow){RGraph.setShadow(this,properties.shadowColor,properties.shadowOffsetx,properties.shadowOffsety,properties.shadowBlur);}
for(var i=0;i<this.data.length;++i){var segmentRadians=((this.data[i][1]/total)*RGraph.TWOPI);var radius=((this.data[i][0]-properties.scaleMin)/(this.max-properties.scaleMin))*this.radius;radius=radius*properties.animationGrowMultiplier;this.context.strokeStyle=properties.colorsStroke;this.context.fillStyle=properties.colors[0];if(properties.colorsSequential){this.context.fillStyle=properties.colors[i];}
this.context.beginPath();var startAngle=(this.startRadians*properties.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=((this.startRadians+segmentRadians)*properties.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,properties.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.arc(this.centerx+explodedX,this.centery+explodedY,properties.animationRoundrobinRadius?radius*properties.animationRoundrobinFactor:radius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.stroke();this.context.fill();this.angles[i]=[startAngle,endAngle,0,properties.animationRoundrobinRadius?radius*properties.animationRoundrobinFactor:radius,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];sequentialIndex++;this.startRadians+=segmentRadians;}
if(properties.shadow){RGraph.noShadow(this);this.redrawRose();}
if(properties.linewidth>1){this.restrokeRose();}}else{var sequentialColorIndex=0;if(properties.shadow){RGraph.setShadow(this,properties.shadowColor,properties.shadowOffsetx,properties.shadowOffsety,properties.shadowBlur);}
for(var i=0;i<this.data.length;++i){var segmentRadians=(1/this.data.length)*RGraph.TWOPI;if(typeof this.data[i]=='number'){this.context.beginPath();this.context.strokeStyle=properties.colorsStroke;this.context.fillStyle=properties.colors[0];if(properties.colorsSequential){this.context.fillStyle=properties.colors[i];}
var radius=((this.data[i]-properties.scaleMin)/(this.max-properties.scaleMin))*this.radius;radius=radius*properties.animationGrowMultiplier;var startAngle=(this.startRadians*properties.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=(this.startRadians*properties.animationRoundrobinFactor)+(segmentRadians*properties.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,properties.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.arc(this.centerx+explodedX,this.centery+explodedY,properties.animationRoundrobinRadius?radius*properties.animationRoundrobinFactor:radius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.fill();this.context.stroke();this.context.beginPath();if(endAngle==0){}
this.angles[i]=[startAngle,endAngle,0,radius*properties.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];sequentialIndex++;}else if(typeof this.data[i]=='object'){var margin=properties.margin/(180/RGraph.PI);if(!this.angles2[i]){this.angles2[i]=[];}
for(var j=0;j<this.data[i].length;++j){var startAngle=(this.startRadians*properties.animationRoundrobinFactor)-RGraph.HALFPI+margin;var endAngle=(this.startRadians*properties.animationRoundrobinFactor)+(segmentRadians*properties.animationRoundrobinFactor)-RGraph.HALFPI-margin;var exploded=this.getExploded(i,startAngle,endAngle,properties.exploded);var explodedX=exploded[0];var explodedY=exploded[1];this.context.strokeStyle=properties.colorsStroke;this.context.fillStyle=properties.colors[j];if(properties.colorsSequential){this.context.fillStyle=properties.colors[sequentialColorIndex++];}
if(j==0){this.context.beginPath();var startRadius=0;var endRadius=((this.data[i][j]-properties.scaleMin)/(this.max-properties.scaleMin))*this.radius;endRadius=endRadius*properties.animationGrowMultiplier;this.context.arc(this.centerx+explodedX,this.centery+explodedY,properties.animationRoundrobinRadius?endRadius*properties.animationRoundrobinFactor:endRadius,startAngle,endAngle,0);this.context.lineTo(this.centerx+explodedX,this.centery+explodedY);this.context.closePath();this.context.stroke();this.context.fill();this.angles[sequentialIndex++]=[startAngle,endAngle,0,endRadius*properties.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];this.angles2[i][j]=[startAngle,endAngle,0,endRadius*properties.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];}else{this.context.beginPath();var startRadius=endRadius;var endRadius=(((this.data[i][j]-properties.scaleMin)/(this.max-properties.scaleMin))*this.radius)+startRadius;endRadius=endRadius*properties.animationGrowMultiplier;this.context.arc(this.centerx+explodedX,this.centery+explodedY,startRadius*properties.animationRoundrobinFactor,startAngle,endAngle,0);this.context.arc(this.centerx+explodedX,this.centery+explodedY,endRadius*properties.animationRoundrobinFactor,endAngle,startAngle,true);this.context.closePath();this.context.stroke();this.context.fill();this.angles[sequentialIndex++]=[startAngle,endAngle,startRadius*properties.animationRoundrobinFactor,endRadius*properties.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];this.angles2[i][j]=[startAngle,endAngle,startRadius*properties.animationRoundrobinFactor,endRadius*properties.animationRoundrobinFactor,this.centerx+explodedX,this.centery+explodedY,this.context.strokeStyle,this.context.fillStyle];}}}
this.startRadians+=segmentRadians;}
if(properties.shadow){RGraph.noShadow(this);}
if(properties.shadow){this.redrawRose();}
if(properties.linewidth>1){this.restrokeRose();}
if(properties.shadow){this.redrawRose();}}
if(properties.colorsAlpha){this.context.globalAlpha=1;}
if(properties.title){RGraph.drawTitle(this);}};this.restrokeRose=function()
{var angles=this.angles;for(var i=0;i<angles.length;++i){this.path('b a % % % % % false a % % % % % true c s %',angles[i][4],angles[i][5],angles[i][2],angles[i][0],angles[i][1],angles[i][4],angles[i][5],angles[i][3],angles[i][1],angles[i][0],angles[i][6]);}};this.redrawRose=function()
{var angles=this.angles;for(var i=0;i<angles.length;++i){this.path('b a % % % % % false a % % % % % true c f % f % ',angles[i][4],angles[i][5],angles[i][2],angles[i][0],angles[i][1],angles[i][4],angles[i][5],angles[i][3],angles[i][1],angles[i][0],angles[i][6],angles[i][7]);}};this.drawLabels=function()
{if(properties.labels&&properties.labels.length){if(typeof properties.labels==='string'){properties.labels=RGraph.arrayPad({array:[],length:this.data.length,value:properties.labels});}
for(var i=0;i<properties.labels.length;++i){properties.labels[i]=RGraph.labelSubstitution({object:this,text:properties.labels[i],index:i,value:this.data[i],decimals:properties.labelsFormattedDecimals||0,unitsPre:properties.labelsFormattedUnitsPre||'',unitsPost:properties.labelsFormattedUnitsPost||'',thousand:properties.labelsFormattedThousand||',',point:properties.labelsFormattedPoint||'.'});}}
this.context.lineWidth=1;var key=properties.key;if(key&&key.length){RGraph.drawKey(this,key,properties.colors);}
this.context.fillStyle=properties.textColor;this.context.strokeStyle='black';var radius=this.radius,font=properties.textFont,size=properties.textSize,axes=properties.labelsAxes.toLowerCase(),decimals=properties.scaleDecimals,units_pre=properties.scaleUnitsPre,units_post=properties.scaleUnitsPost,centerx=this.centerx,centery=this.centery+(properties.variant.indexOf('3d')!==-1?properties.variantThreedDepth:0);if(typeof properties.labels=='object'&&properties.labels){this.drawCircularLabels(this.context,properties.labels,font,size,radius+10);}
if(typeof properties.textSize=='number'){size=properties.textSize;}
var color='rgba(255,255,255,0.8)';if(axes.indexOf('n')>-1){if(properties.backgroundAxes){var offset=-10;var halign='right';}else{var offset=0;var halign='center';}
var textConf=RGraph.getTextConf({object:this,prefix:'labelsAxes'});for(var i=0;i<properties.labelsAxesCount;++i){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:centerx+offset+properties.labelsAxesOffsetx,y:centery-(radius*((i+1)/properties.labelsAxesCount))+properties.labelsAxesOffsety,text:this.scale2.labels[i],valign:'center',halign:halign,bounding:true,boundingFill:color,boundingStroke:'rgba(0,0,0,0)',tag:'scale'});}}
if(axes.indexOf('s')>-1){if(properties.backgroundAxes){var offset=-10;var halign='right';}else{var offset=0;var halign='center';}
for(var i=0;i<properties.labelsAxesCount;++i){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+offset+properties.labelsAxesOffsetx,'y':centery+(radius*((i+1)/properties.labelsAxesCount))+properties.labelsAxesOffsety,'text':this.scale2.labels[i],'valign':'center','halign':halign,'bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(axes.indexOf('e')>-1){for(var i=0;i<properties.labelsAxesCount;++i){if(properties.backgroundAxes){var offset=10;var valign='top';}else{var offset=0;var valign='center';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+(radius*((i+1)/properties.labelsAxesCount))+properties.labelsAxesOffsetx,'y':centery+offset+properties.labelsAxesOffsety,'text':this.scale2.labels[i],'valign':valign,'halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(axes.indexOf('w')>-1){for(var i=0;i<properties.labelsAxesCount;++i){if(properties.backgroundAxes){var offset=10;var valign='top';}else{var offset=0;var valign='center';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx-(radius*((i+1)/properties.labelsAxesCount))+properties.labelsAxesOffsetx,'y':centery+offset+properties.labelsAxesOffsety,'text':this.scale2.labels[i],'valign':valign,'halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}}
if(RGraph.trim(axes).length>0){RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,'x':centerx+properties.labelsAxesOffsetx,'y':centery+properties.labelsAxesOffsety,'text':typeof properties.scaleMin==='number'?RGraph.numberFormat({object:this,number:Number(properties.scaleMin).toFixed(properties.scaleMin===0?'0':properties.scaleDecimals),unitspre:units_pre,unitspost:units_post}):'0','valign':'center','halign':'center','bounding':true,'bounding.fill':color,'bounding.stroke':'rgba(0,0,0,0)','tag':'scale'});}};this.drawCircularLabels=function(context,labels,font,size,radius)
{var variant=properties.variant,position=properties.labelsPosition,radius=radius+5+properties.labelsOffsetRadius,centerx=this.centerx,centery=this.centery+(properties.variant.indexOf('3d')!==-1?properties.variantThreedDepth:0),labelsColor=properties.labelsColor||properties.textColor,angles=this.angles;var textConf=RGraph.getTextConf({object:this,prefix:'labels'});for(var i=0;i<this.data.length;++i){if(typeof variant=='string'&&variant.indexOf('non-equi-angular')!==-1){var a=Number(angles[i][0])+((angles[i][1]-angles[i][0])/2);}else{var a=(RGraph.TWOPI/this.data.length)*(i+1)-(RGraph.TWOPI/(this.data.length*2));a=a-RGraph.HALFPI+(properties.labelsPosition=='edge'?((RGraph.TWOPI/this.data.length)/2):0);a=a+properties.anglesStart;}
var x=centerx+(Math.cos(a)*radius);var y=centery+(Math.sin(a)*radius);if(x>centerx){halign='left';}else if(Math.round(x)==centerx){halign='center';}else{halign='right';}
RGraph.text({object:this,font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:x,y:y,text:String(labels[i]||''),halign:halign,valign:'center',tag:'labels',cssClass:RGraph.getLabelsCSSClassName({object:this,name:'labelsClass',index:i})});}};this.getShape=function(e)
{var angles=this.angles;var ret=[];var opt=arguments[1]?arguments[1]:{radius:true};for(var i=0;i<angles.length;++i){var angleStart=angles[i][0];var angleEnd=angles[i][1];var radiusStart=opt.radius===false?0:angles[i][2];var radiusEnd=opt.radius===false?this.radius:angles[i][3];var centerX=angles[i][4];var centerY=angles[i][5];var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0]-centerX;var mouseY=mouseXY[1]-centerY;this.path('b a % % % % % % a % % % % % % c',centerX,centerY,radiusStart?radiusStart:0.01,angleStart,angleEnd,false,centerX,centerY,radiusEnd,angleEnd,angleStart,true);if(this.context.isPointInPath(mouseXY[0],mouseXY[1])){angles[i][6]=i;if(RGraph.parseTooltipText){var tooltip=RGraph.parseTooltipText(properties.tooltips,angles[i][6]);}
var indexes=RGraph.sequentialIndexToGrouped(i,this.data);angles[i].object=this;angles[i].x=angles[i][4];angles[i].y=angles[i][5];angles[i]['angle.start']=angles[i][0];angles[i]['angle.end']=angles[i][1];angles[i]['radius.start']=angles[i][2];angles[i]['radius.end']=angles[i][3];angles[i].index=indexes[1];angles[i].dataset=indexes[0];angles[i].sequentialIndex=angles[i][6];angles[i].tooltip=tooltip?tooltip:null;angles[i].label=(typeof properties.labels==='object'&&!RGraph.isNull(properties.labels)&&typeof properties.labels[indexes[0]]==='string')?properties.labels[angles[i].dataset]:null;if(properties.variant==='non-equi-angular'){angles[i].dataset=angles[i].sequentialIndex;angles[i].index=0;angles[i].label=(RGraph.isArray(properties.labels)&&typeof properties.labels[angles[i].dataset]==='string')?properties.labels[angles[i].dataset]:null;}
return{object:this,x:angles[i][4],y:angles[i][5],angleStart:angles[i][0],angleEnd:angles[i][1],radiusStart:angles[i][2],radiusEnd:angles[i][3],dataset:angles[i].dataset,index:angles[i].index,sequentialIndex:angles[i][6],label:angles[i].label,tooltip:typeof tooltip==='string'?tooltip:null};}}
return null;};this.getExploded=function(index,startAngle,endAngle,exploded)
{var explodedx,explodedy;if(typeof exploded=='object'&&typeof exploded[index]=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded[index];explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded[index];}else if(typeof exploded=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded;explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded;}else{explodedx=0;explodedy=0;}
return[explodedx,explodedy];};this.allowTooltips=function()
{RGraph.preLoadTooltipImages(this);RGraph.installWindowMousedownTooltipListener(this);RGraph.installCanvasMousemoveTooltipListener(this);RGraph.installCanvasMouseupTooltipListener(this);};this.highlight=function(shape)
{if(properties.tooltipsHighlight){if(typeof properties.highlightStyle==='function'){(properties.highlightStyle)(shape);return;}
if(typeof properties.highlightStyle==='string'&&properties.highlightStyle==='invert'){for(var i=0;i<this.angles.length;++i){if(i!==shape.sequentialIndex){this.path('b m % % a % % % % % false',this.angles[i][4],this.angles[i][5],this.angles[i][4],this.angles[i][5],this.angles[i][3],this.angles[i][0],this.angles[i][1]);if(this.angles[i][2]>0){this.path('a % % % % % true',this.angles[i][4],this.angles[i][5],this.angles[i][2],this.angles[i][1],this.angles[i][0]);}else{this.path('l % %',this.angles[i][4],this.angles[i][5]);}
this.path('c s % f %',properties.highlightStroke,properties.highlightFill);}}
return;}
this.path('b a % % % % % false',shape.x,shape.y,shape.radiusEnd,shape.angleStart,shape.angleEnd);if(shape.radiusStart>0){this.path('a % % % % % true',shape.x,shape.y,shape.radiusStart,shape.angleEnd,shape.angleStart);}else{this.path('l % %',shape.x,shape.y);}
this.path('c s % f %',properties.highlightStroke,properties.highlightFill);}};this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e);var radius=RGraph.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(properties.variant.indexOf('3d')!==-1){radius/=-1;var additional3D=100;}else{var additional3D=0;}
if(mouseXY[0]>(this.centerx-this.radius-additional3D)&&mouseXY[0]<(this.centerx+this.radius+additional3D)&&mouseXY[1]>(this.centery-this.radius)&&mouseXY[1]<(this.centery+this.radius)&&radius<=this.radius){return this;}};this.getRadius=function(value)
{if(value<0||value>this.max){return null;}
var r=(value/this.max)*this.radius;return r;};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors.colors=RGraph.arrayClone(properties.colors);this.original_colors.keyColors=RGraph.arrayClone(properties.keyColors);this.original_colors.highlightStroke=RGraph.arrayClone(properties.highlightStroke);this.original_colors.highlightFill=RGraph.arrayClone(properties.highlightFill);}
for(var i=0;i<properties.colors.length;++i){properties.colors[i]=this.parseSingleColorForGradient(properties.colors[i]);}
if(!RGraph.isNull(properties.keyColors)){for(var i=0;i<properties.keyColors.length;++i){properties.keyColors[i]=this.parseSingleColorForGradient(properties.keyColors[i]);}}
properties.highlightFill=this.parseSingleColorForGradient(properties.highlightFill);properties.highlightStroke=this.parseSingleColorForGradient(properties.highlightStroke);properties.segmentHighlightStroke=this.parseSingleColorForGradient(properties.segmentHighlightStroke);properties.segmentHighlightFill=this.parseSingleColorForGradient(properties.segmentHighlightFill);};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color||typeof color!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=this.context.createRadialGradient(this.centerx,this.centery,0,this.centerx,this.centery,this.radius);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RGraph.trim(parts[j]));}}
return grad?grad:color;};this.interactiveKeyHighlight=function(index)
{var segments=this.angles2;for(var i=0;i<this.angles2.length;i+=1){this.context.beginPath();this.context.lineWidth=2;this.context.fillStyle=properties.keyInteractiveHighlightChartFill;this.context.strokeStyle=properties.keyInteractiveHighlightChartStroke;this.context.arc(segments[i][index][4],segments[i][index][5],segments[i][index][2],segments[i][index][0],segments[i][index][1],false);this.context.arc(segments[i][index][4],segments[i][index][5],segments[i][index][3],segments[i][index][1],segments[i][index][0],true);this.context.closePath();this.context.fill();this.context.stroke();}
return;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RGraph.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};this.explode=function()
{this.cancelStopAnimation();var obj=this,opt=arguments[0]||{},callback=arguments[1]||function(){},frames=opt.frames?opt.frames:30,frame=0,explodedMax=Math.max(this.canvas.width,this.canvas.height),exploded=Number(this.get('exploded')),originalExploded=RGraph.arrayClone(this.get('exploded'));if(RGraph.isArray(originalExploded)){var exploded=new Array(this.data.length);for(let i=0;i<this.data.length;++i){exploded[i]=originalExploded[i]||0;originalExploded[i]=originalExploded[i]||0;}}else{var exploded=explodedMax;}
function iterator()
{if(obj.stopAnimationRequested){obj.stopAnimationRequested=false;return;}
if(RGraph.isArray(originalExploded)){for(let i=0;i<obj.data.length;++i){exploded[i]=((frame/frames)*(explodedMax-originalExploded[i]))+originalExploded[i];}}else{exploded=(frame/frames)*explodedMax;}
obj.set('exploded',exploded);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};this.roundrobin=this.roundRobin=function()
{this.cancelStopAnimation();var obj=this,opt=arguments[0]||{},frames=opt.frames||30,frame=0,margin=(360/this.data.length)/2,callback=arguments[1]||function(){}
this.originalMargin=this.get('margin');this.set('margin',margin);this.set('animationRoundrobinFactor',0);function iterator()
{if(obj.stopAnimationRequested){obj.stopAnimationRequested=false;return;}
RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){obj.set('animationRoundrobinFactor',frame/frames);obj.set('margin',(frame/frames)*obj.originalMargin);RGraph.Effects.updateCanvas(iterator);}else{obj.set('animationRoundrobinFactor',1);obj.set('margin',obj.originalMargin);callback(obj);}}
iterator();return this;};this.implode=function()
{this.cancelStopAnimation();var obj=this,opt=arguments[0]||{},callback=arguments[1]||function(){},frames=opt.frames||30,frame=0,explodedMax=Math.max(this.canvas.width,this.canvas.height),originalExploded=RGraph.arrayClone(this.get('exploded'));if(RGraph.isArray(originalExploded)){var exploded=new Array(this.data.length);for(let i=0;i<this.data.length;++i){exploded[i]=explodedMax;}}else{var exploded=explodedMax;}
function iterator()
{if(obj.stopAnimationRequested){obj.stopAnimationRequested=false;return;}
if(RGraph.isArray(originalExploded)){for(let i=0;i<obj.data.length;++i){exploded[i]=explodedMax-((frame/frames)*(explodedMax-(originalExploded[i]||0)));}}else{exploded=explodedMax-((frame/frames)*(explodedMax-originalExploded));}
obj.set('exploded',exploded);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame++<frames){RGraph.Effects.updateCanvas(iterator);}else{RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);callback(obj);}}
iterator();return this;};this.grow=function()
{this.cancelStopAnimation();var obj=this,opt=arguments[0]||{},callback=arguments[1]||function(){},frames=opt.frames||30,frame=0;function iterator()
{if(obj.stopAnimationRequested){obj.stopAnimationRequested=false;return;}
obj.set('animationGrowMultiplier',frame/frames);RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame<frames){frame++;RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};this.stopAnimation=function()
{this.set('animationGrowMultiplier',1);this.set('animationRoundrobinFactor',1);if(RGraph.isNumber(this.originalMargin)){this.set('margin',this.originalMargin);}
this.set('exploded',[]);this.stopAnimationRequested=true;};this.cancelStopAnimation=function()
{this.stopAnimationRequested=false;};this.tooltipSubstitutions=function(opt)
{var indexes=RGraph.sequentialIndexToGrouped(opt.index,this.data);var value=this.data_arr[opt.index];var values=typeof this.data[indexes[0]]==='number'?[this.data[indexes[0]]]:this.data[indexes[0]];if(properties.variant==='non-equi-angular'&&RGraph.isArray(this.data[indexes[0]])){value=this.data[opt.index][0];value2=this.data[opt.index][1];indexes=[opt.index,0];}
return{index:indexes[1],dataset:indexes[0],sequentialIndex:opt.index,value:value,value2:typeof value2==='number'?value2:null,values:values};};this.tooltipsFormattedCustom=function(specific,index,colors)
{var color=properties.colors[index];if(properties.colorsSequential){color=colors[specific.sequential];}
if(typeof this.data[specific.dataset]==='number'){var label=properties.tooltipsFormattedKeyLabels[0]||'';var color=properties.colors[0];if(properties.tooltipsFormattedKeyColors&&properties.tooltipsFormattedKeyColors[0]){color=properties.tooltipsFormattedKeyColors[0];}}else if(typeof this.data[specific.dataset]==='object'&&properties.variant==='non-equi-angular'){if(index===0){var color=colors[0];var value=this.data[specific.dataset][0];if(properties.tooltipsFormattedKeyColors&&properties.tooltipsFormattedKeyColors[specific.index]){color=properties.tooltipsFormattedKeyColors[specific.index];}}else{var skip=true;}}else if(typeof this.data[specific.dataset]==='object'&&properties.variant!=='non-equi-angular'){if(properties.tooltipsFormattedKeyColors&&properties.tooltipsFormattedKeyColors[index]){color=properties.tooltipsFormattedKeyColors[index];}}
return{continue:skip,label:label,color:color,value:value};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,canvasXY=RGraph.getCanvasXY(obj.canvas)
segment=this.angles[args.index],shape=this.getShape(e),angle=((shape.angleEnd-shape.angleStart)/2)+shape.angleStart,multiplier=0.5;var endpoint=RGraph.getRadiusEndPoint(shape.x,shape.y,angle,((shape.radiusEnd-shape.radiusStart)/2)+shape.radiusStart);if(properties.variant.indexOf('3d')!==-1){var width=this.radius/2;endpoint[0]=(endpoint[0]-this.centerx)*1.5+this.centerx;}
args.tooltip.style.left=(canvasXY[0]
+endpoint[0]
-(tooltip.offsetWidth/2)
+obj.properties.tooltipsOffsetx)+'px';args.tooltip.style.top=(canvasXY[1]
+endpoint[1]
-tooltip.offsetHeight
+obj.properties.tooltipsOffsety
-10)+'px';};RGraph.register(this);RGraph.parseObjectStyleConfig(this,conf.options);};