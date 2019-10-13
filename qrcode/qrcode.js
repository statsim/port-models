!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).QRCode=t()}}(function(){return function(){return function t(e,r,n){function i(o,s){if(!r[o]){if(!e[o]){var h="function"==typeof require&&require;if(!s&&h)return h(o,!0);if(a)return a(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[o]={exports:{}};e[o][0].call(c.exports,function(t){var r=e[o][1][t];return i(r||t)},c,c.exports,t,e,r,n)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}}()({1:[function(t,e,r){const{qrcode:n}=t("pure-svg-code");e.exports=function(t){return n({content:t.content||"http://github.com/",padding:t.padding||5,width:t.size||256,height:t.size||256,color:t.color||"#000000",background:t.background||"#ffffff",ecl:t.ecl||"M"})}},{"pure-svg-code":3}],2:[function(t,e,r){var n={settings:{width:100,barWidth:1,barHeight:50,moduleSize:1,showHRI:!1,addQuietZone:!1,marginHRI:0,bgColor:"transparent",color:"#000000",fontSize:12,output:"svg",posX:0,posY:0},intval:function(t){var e=typeof t;return"string"==e?(t=t.replace(/[^0-9-.]/g,""),t=parseInt(1*t,10),isNaN(t)||!isFinite(t)?0:t):"number"==e&&isFinite(t)?Math.floor(t):0},i25:{encoding:["NNWWN","WNNNW","NWNNW","WWNNN","NNWNW","WNWNN","NWWNN","NNNWW","WNNWN","NWNWN"],compute:function(t,e,r){if(e){"int25"==r&&t.length%2==0&&(t="0"+t);for(var i,a=!0,o=0,s=t.length-1;s>-1;s--){if(i=n.intval(t.charAt(s)),isNaN(i))return"";o+=a?3*i:i,a=!a}t+=((10-o%10)%10).toString()}else t.length%2!=0&&(t="0"+t);return t},getDigit:function(t,e,r){if(""==(t=this.compute(t,e,r)))return"";var n;if(result="","int25"==r){var i,a;for(result+="1010",s=0;s<t.length/2;s++)for(i=t.charAt(2*s),a=t.charAt(2*s+1),n=0;n<5;n++)result+="1","W"==this.encoding[i].charAt(n)&&(result+="1"),result+="0","W"==this.encoding[a].charAt(n)&&(result+="0");result+="1101"}else if("std25"==r){var o;result+="11011010";for(var s=0;s<t.length;s++)for(o=t.charAt(s),n=0;n<5;n++)result+="1","W"==this.encoding[o].charAt(n)&&(result+="11"),result+="0";result+="11010110"}return result}},ean:{encoding:[["0001101","0100111","1110010"],["0011001","0110011","1100110"],["0010011","0011011","1101100"],["0111101","0100001","1000010"],["0100011","0011101","1011100"],["0110001","0111001","1001110"],["0101111","0000101","1010000"],["0111011","0010001","1000100"],["0110111","0001001","1001000"],["0001011","0010111","1110100"]],first:["000000","001011","001101","001110","010011","011001","011100","010101","010110","011010"],getDigit:function(t,e){var r,i="ean8"==e?7:12;if((t=t.substring(0,i)).length!=i)return"";for(var a=0;a<t.length;a++)if((r=t.charAt(a))<"0"||r>"9")return"";t=this.compute(t,e);var o="101";if("ean8"==e){for(a=0;a<4;a++)o+=this.encoding[n.intval(t.charAt(a))][0];o+="01010";for(a=4;a<8;a++)o+=this.encoding[n.intval(t.charAt(a))][2]}else{var s=this.first[n.intval(t.charAt(0))];for(a=1;a<7;a++)o+=this.encoding[n.intval(t.charAt(a))][n.intval(s.charAt(a-1))];o+="01010";for(a=7;a<13;a++)o+=this.encoding[n.intval(t.charAt(a))][2]}return o+="101"},compute:function(t,e){for(var r="ean13"==e?12:7,i=0,a=!0,o=(t=t.substring(0,r)).length-1;o>-1;o--)i+=(a?3:1)*n.intval(t.charAt(o)),a=!a;return t+((10-i%10)%10).toString()}},upc:{getDigit:function(t){return t.length<12&&(t="0"+t),n.ean.getDigit(t,"ean13")},compute:function(t){return t.length<12&&(t="0"+t),n.ean.compute(t,"ean13").substr(1)}},msi:{encoding:["100100100100","100100100110","100100110100","100100110110","100110100100","100110100110","100110110100","100110110110","110100100100","110100100110"],compute:function(t,e){return"object"==typeof e?("mod10"==e.crc1?t=this.computeMod10(t):"mod11"==e.crc1&&(t=this.computeMod11(t)),"mod10"==e.crc2?t=this.computeMod10(t):"mod11"==e.crc2&&(t=this.computeMod11(t))):"boolean"==typeof e&&e&&(t=this.computeMod10(t)),t},computeMod10:function(t){var e,r=t.length%2,i=0,a=0;for(e=0;e<t.length;e++)r?i=10*i+n.intval(t.charAt(e)):a+=n.intval(t.charAt(e)),r=!r;var o=(2*i).toString();for(e=0;e<o.length;e++)a+=n.intval(o.charAt(e));return t+((10-a%10)%10).toString()},computeMod11:function(t){for(var e=0,r=2,i=t.length-1;i>=0;i--)e+=r*n.intval(t.charAt(i)),r=7==r?2:r+1;return t+((11-e%11)%11).toString()},getDigit:function(t,e){var r=0,n="";for(t=this.compute(t,!1),n="110",i=0;i<t.length;i++){if((r="0123456789".indexOf(t.charAt(i)))<0)return"";n+=this.encoding[r]}return n+="1001"}},code11:{encoding:["101011","1101011","1001011","1100101","1011011","1101101","1001101","1010011","1101001","110101","101101"],getDigit:function(t){var e,r,n="";for(n="10110010",e=0;e<t.length;e++){if((r="0123456789-".indexOf(t.charAt(e)))<0)return"";n+=this.encoding[r]+"0"}var i=0,a=0,o=1,s=0;for(e=t.length-1;e>=0;e--)i=10==i?1:i+1,o=10==o?1:o+1,a+=i*(r="0123456789-".indexOf(t.charAt(e))),s+=o*r;var h=a%11,u=(s+=h)%11;return n+=this.encoding[h]+"0",t.length>=10&&(n+=this.encoding[u]+"0"),n+="1011001"}},code39:{encoding:["101001101101","110100101011","101100101011","110110010101","101001101011","110100110101","101100110101","101001011011","110100101101","101100101101","110101001011","101101001011","110110100101","101011001011","110101100101","101101100101","101010011011","110101001101","101101001101","101011001101","110101010011","101101010011","110110101001","101011010011","110101101001","101101101001","101010110011","110101011001","101101011001","101011011001","110010101011","100110101011","110011010101","100101101011","110010110101","100110110101","100101011011","110010101101","100110101101","100100100101","100100101001","100101001001","101001001001","100101101101"],getDigit:function(t){var e,r,n="";if(t.indexOf("*")>=0)return"";for(t=("*"+t+"*").toUpperCase(),e=0;e<t.length;e++){if((r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*".indexOf(t.charAt(e)))<0)return"";e>0&&(n+="0"),n+=this.encoding[r]}return n}},code93:{encoding:["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],getDigit:function(t,e){var r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%____*",n="";if(t.indexOf("*")>=0)return"";for(t=t.toUpperCase(),n+=this.encoding[47],i=0;i<t.length;i++){if(a=t.charAt(i),index=r.indexOf(a),"_"==a||index<0)return"";n+=this.encoding[index]}if(e){var a,o=0,s=0,h=1,u=0;for(i=t.length-1;i>=0;i--)o=20==o?1:o+1,h=15==h?1:h+1,index=r.indexOf(t.charAt(i)),s+=o*index,u+=h*index;var c=(u+=a=s%47)%47;n+=this.encoding[a],n+=this.encoding[c]}return n+=this.encoding[47],n+="1"}},code128:{encoding:["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100","11000111010"],getDigit:function(t){var e=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",r="",i=0,a=0,o=0,s=0,h=0;for(o=0;o<t.length;o++)if(-1==e.indexOf(t.charAt(o)))return"";var u=t.length>1,c="";for(o=0;o<3&&o<t.length;o++)u&=(c=t.charAt(o))>="0"&&c<="9";for(i=u?105:104,r=this.encoding[i],o=0;o<t.length;){if(u)(o==t.length||t.charAt(o)<"0"||t.charAt(o)>"9"||t.charAt(o+1)<"0"||t.charAt(o+1)>"9")&&(u=!1,r+=this.encoding[100],i+=100*++a);else{for(s=0;o+s<t.length&&t.charAt(o+s)>="0"&&t.charAt(o+s)<="9";)s++;(u=s>5||o+s-1==t.length&&s>3)&&(r+=this.encoding[99],i+=99*++a)}u?(h=n.intval(t.charAt(o)+t.charAt(o+1)),o+=2):(h=e.indexOf(t.charAt(o)),o+=1),r+=this.encoding[h],i+=++a*h}return r+=this.encoding[i%103],r+=this.encoding[106],r+="11"}},codabar:{encoding:["101010011","101011001","101001011","110010101","101101001","110101001","100101011","100101101","100110101","110100101","101001101","101100101","1101011011","1101101011","1101101101","1011011011","1011001001","1010010011","1001001011","1010011001"],getDigit:function(t){var e,r,n="";for(n+=this.encoding[16]+"0",e=0;e<t.length;e++){if((r="0123456789-$:/.+".indexOf(t.charAt(e)))<0)return"";n+=this.encoding[r]+"0"}return n+=this.encoding[16]}},datamatrix:{lengthRows:[10,12,14,16,18,20,22,24,26,32,36,40,44,48,52,64,72,80,88,96,104,120,132,144,8,8,12,12,16,16],lengthCols:[10,12,14,16,18,20,22,24,26,32,36,40,44,48,52,64,72,80,88,96,104,120,132,144,18,32,26,36,36,48],dataCWCount:[3,5,8,12,18,22,30,36,44,62,86,114,144,174,204,280,368,456,576,696,816,1050,1304,1558,5,10,16,22,32,49],solomonCWCount:[5,7,10,12,14,18,20,24,28,36,42,48,56,68,84,112,144,192,224,272,336,408,496,620,7,11,14,18,24,28],dataRegionRows:[8,10,12,14,16,18,20,22,24,14,16,18,20,22,24,14,16,18,20,22,24,18,20,22,6,6,10,10,14,14],dataRegionCols:[8,10,12,14,16,18,20,22,24,14,16,18,20,22,24,14,16,18,20,22,24,18,20,22,16,14,24,16,16,22],regionRows:[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,4,4,4,4,4,4,6,6,6,1,1,1,1,1,1],regionCols:[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,4,4,4,4,4,4,6,6,6,1,2,1,2,2,2],interleavedBlocks:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,4,4,4,4,6,6,8,8,1,1,1,1,1,1],logTab:[-255,255,1,240,2,225,241,53,3,38,226,133,242,43,54,210,4,195,39,114,227,106,134,28,243,140,44,23,55,118,211,234,5,219,196,96,40,222,115,103,228,78,107,125,135,8,29,162,244,186,141,180,45,99,24,49,56,13,119,153,212,199,235,91,6,76,220,217,197,11,97,184,41,36,223,253,116,138,104,193,229,86,79,171,108,165,126,145,136,34,9,74,30,32,163,84,245,173,187,204,142,81,181,190,46,88,100,159,25,231,50,207,57,147,14,67,120,128,154,248,213,167,200,63,236,110,92,176,7,161,77,124,221,102,218,95,198,90,12,152,98,48,185,179,42,209,37,132,224,52,254,239,117,233,139,22,105,27,194,113,230,206,87,158,80,189,172,203,109,175,166,62,127,247,146,66,137,192,35,252,10,183,75,216,31,83,33,73,164,144,85,170,246,65,174,61,188,202,205,157,143,169,82,72,182,215,191,251,47,178,89,151,101,94,160,123,26,112,232,21,51,238,208,131,58,69,148,18,15,16,68,17,121,149,129,19,155,59,249,70,214,250,168,71,201,156,64,60,237,130,111,20,93,122,177,150],aLogTab:[1,2,4,8,16,32,64,128,45,90,180,69,138,57,114,228,229,231,227,235,251,219,155,27,54,108,216,157,23,46,92,184,93,186,89,178,73,146,9,18,36,72,144,13,26,52,104,208,141,55,110,220,149,7,14,28,56,112,224,237,247,195,171,123,246,193,175,115,230,225,239,243,203,187,91,182,65,130,41,82,164,101,202,185,95,190,81,162,105,210,137,63,126,252,213,135,35,70,140,53,106,212,133,39,78,156,21,42,84,168,125,250,217,159,19,38,76,152,29,58,116,232,253,215,131,43,86,172,117,234,249,223,147,11,22,44,88,176,77,154,25,50,100,200,189,87,174,113,226,233,255,211,139,59,118,236,245,199,163,107,214,129,47,94,188,85,170,121,242,201,191,83,166,97,194,169,127,254,209,143,51,102,204,181,71,142,49,98,196,165,103,206,177,79,158,17,34,68,136,61,122,244,197,167,99,198,161,111,222,145,15,30,60,120,240,205,183,67,134,33,66,132,37,74,148,5,10,20,40,80,160,109,218,153,31,62,124,248,221,151,3,6,12,24,48,96,192,173,119,238,241,207,179,75,150,1],champGaloisMult:function(t,e){return t&&e?this.aLogTab[(this.logTab[t]+this.logTab[e])%255]:0},champGaloisDoub:function(t,e){return t?e?this.aLogTab[(this.logTab[t]+e)%255]:t:0},champGaloisSum:function(t,e){return t^e},selectIndex:function(t,e){if((t<1||t>1558)&&!e)return-1;if((t<1||t>49)&&e)return-1;var r=0;for(e&&(r=24);this.dataCWCount[r]<t;)r++;return r},encodeDataCodeWordsASCII:function(t){var e,r,n=new Array,i=0;for(e=0;e<t.length;e++)(r=t.charCodeAt(e))>127?(n[i]=235,r-=127,i++):r>=48&&r<=57&&e+1<t.length&&t.charCodeAt(e+1)>=48&&t.charCodeAt(e+1)<=57?(r=10*(r-48)+(t.charCodeAt(e+1)-48),r+=130,e++):r++,n[i]=r,i++;return n},addPadCW:function(t,e,r){var n,i;if(!(e>=r))for(t[e]=129,i=e+1;i<r;i++)n=149*(i+1)%253+1,t[i]=(129+n)%254},calculSolFactorTable:function(t){var e,r,n=new Array;for(e=0;e<=t;e++)n[e]=1;for(e=1;e<=t;e++)for(r=e-1;r>=0;r--)n[r]=this.champGaloisDoub(n[r],e),r>0&&(n[r]=this.champGaloisSum(n[r],n[r-1]));return n},addReedSolomonCW:function(t,e,r,n,i){var a,o,s,h=0,u=t/i,c=new Array;for(s=0;s<i;s++){for(a=0;a<u;a++)c[a]=0;for(a=s;a<r;a+=i)for(h=this.champGaloisSum(n[a],c[u-1]),o=u-1;o>=0;o--)c[o]=h?this.champGaloisMult(h,e[o]):0,o>0&&(c[o]=this.champGaloisSum(c[o-1],c[o]));for(o=r+s,a=u-1;a>=0;a--)n[o]=c[a],o+=i}return n},getBits:function(t){for(var e=new Array,r=0;r<8;r++)e[r]=t&128>>r?1:0;return e},next:function(t,e,r,n,i,a){var o=0,s=4,h=0;do{s==e&&0==h?(this.patternShapeSpecial1(i,a,n[o],e,r),o++):t<3&&s==e-2&&0==h&&r%4!=0?(this.patternShapeSpecial2(i,a,n[o],e,r),o++):s==e-2&&0==h&&r%8==4?(this.patternShapeSpecial3(i,a,n[o],e,r),o++):s==e+4&&2==h&&r%8==0&&(this.patternShapeSpecial4(i,a,n[o],e,r),o++);do{s<e&&h>=0&&1!=a[s][h]&&(this.patternShapeStandard(i,a,n[o],s,h,e,r),o++),s-=2,h+=2}while(s>=0&&h<r);s+=1,h+=3;do{s>=0&&h<r&&1!=a[s][h]&&(this.patternShapeStandard(i,a,n[o],s,h,e,r),o++),s+=2,h-=2}while(s<e&&h>=0);s+=3,h+=1}while(s<e||h<r)},patternShapeStandard:function(t,e,r,n,i,a,o){this.placeBitInDatamatrix(t,e,r[0],n-2,i-2,a,o),this.placeBitInDatamatrix(t,e,r[1],n-2,i-1,a,o),this.placeBitInDatamatrix(t,e,r[2],n-1,i-2,a,o),this.placeBitInDatamatrix(t,e,r[3],n-1,i-1,a,o),this.placeBitInDatamatrix(t,e,r[4],n-1,i,a,o),this.placeBitInDatamatrix(t,e,r[5],n,i-2,a,o),this.placeBitInDatamatrix(t,e,r[6],n,i-1,a,o),this.placeBitInDatamatrix(t,e,r[7],n,i,a,o)},patternShapeSpecial1:function(t,e,r,n,i){this.placeBitInDatamatrix(t,e,r[0],n-1,0,n,i),this.placeBitInDatamatrix(t,e,r[1],n-1,1,n,i),this.placeBitInDatamatrix(t,e,r[2],n-1,2,n,i),this.placeBitInDatamatrix(t,e,r[3],0,i-2,n,i),this.placeBitInDatamatrix(t,e,r[4],0,i-1,n,i),this.placeBitInDatamatrix(t,e,r[5],1,i-1,n,i),this.placeBitInDatamatrix(t,e,r[6],2,i-1,n,i),this.placeBitInDatamatrix(t,e,r[7],3,i-1,n,i)},patternShapeSpecial2:function(t,e,r,n,i){this.placeBitInDatamatrix(t,e,r[0],n-3,0,n,i),this.placeBitInDatamatrix(t,e,r[1],n-2,0,n,i),this.placeBitInDatamatrix(t,e,r[2],n-1,0,n,i),this.placeBitInDatamatrix(t,e,r[3],0,i-4,n,i),this.placeBitInDatamatrix(t,e,r[4],0,i-3,n,i),this.placeBitInDatamatrix(t,e,r[5],0,i-2,n,i),this.placeBitInDatamatrix(t,e,r[6],0,i-1,n,i),this.placeBitInDatamatrix(t,e,r[7],1,i-1,n,i)},patternShapeSpecial3:function(t,e,r,n,i){this.placeBitInDatamatrix(t,e,r[0],n-3,0,n,i),this.placeBitInDatamatrix(t,e,r[1],n-2,0,n,i),this.placeBitInDatamatrix(t,e,r[2],n-1,0,n,i),this.placeBitInDatamatrix(t,e,r[3],0,i-2,n,i),this.placeBitInDatamatrix(t,e,r[4],0,i-1,n,i),this.placeBitInDatamatrix(t,e,r[5],1,i-1,n,i),this.placeBitInDatamatrix(t,e,r[6],2,i-1,n,i),this.placeBitInDatamatrix(t,e,r[7],3,i-1,n,i)},patternShapeSpecial4:function(t,e,r,n,i){this.placeBitInDatamatrix(t,e,r[0],n-1,0,n,i),this.placeBitInDatamatrix(t,e,r[1],n-1,i-1,n,i),this.placeBitInDatamatrix(t,e,r[2],0,i-3,n,i),this.placeBitInDatamatrix(t,e,r[3],0,i-2,n,i),this.placeBitInDatamatrix(t,e,r[4],0,i-1,n,i),this.placeBitInDatamatrix(t,e,r[5],1,i-3,n,i),this.placeBitInDatamatrix(t,e,r[6],1,i-2,n,i),this.placeBitInDatamatrix(t,e,r[7],1,i-1,n,i)},placeBitInDatamatrix:function(t,e,r,n,i,a,o){n<0&&(n+=a,i+=4-(a+4)%8),i<0&&(i+=o,n+=4-(o+4)%8),1!=e[n][i]&&(t[n][i]=r,e[n][i]=1)},addFinderPattern:function(t,e,r,n,i){var a=(n+2)*e,o=(i+2)*r,s=new Array;s[0]=new Array;for(var h=0;h<o+2;h++)s[0][h]=0;for(var u=0;u<a;u++){s[u+1]=new Array,s[u+1][0]=0,s[u+1][o+1]=0;for(h=0;h<o;h++)u%(n+2)==0?s[u+1][h+1]=h%2==0?1:0:u%(n+2)==n+1?s[u+1][h+1]=1:h%(i+2)==i+1?s[u+1][h+1]=u%2==0?0:1:h%(i+2)==0?s[u+1][h+1]=1:(s[u+1][h+1]=0,s[u+1][h+1]=t[u-1-2*parseInt(u/(n+2))][h-1-2*parseInt(h/(i+2))])}s[a+1]=new Array;for(h=0;h<o+2;h++)s[a+1][h]=0;return s},getDigit:function(t,e){var r=this.encodeDataCodeWordsASCII(t),n=r.length,i=this.selectIndex(n,e),a=this.dataCWCount[i],o=this.solomonCWCount[i],s=a+o,h=this.lengthRows[i],u=this.lengthCols[i],c=this.regionRows[i],l=this.regionCols[i],g=this.dataRegionRows[i],f=this.dataRegionCols[i],d=h-2*c,p=u-2*l,m=this.interleavedBlocks[i],v=o/m;this.addPadCW(r,n,a);var D=this.calculSolFactorTable(v);this.addReedSolomonCW(o,D,a,r,m);for(var w=new Array,B=0;B<s;B++)w[B]=this.getBits(r[B]);var A=new Array,C=new Array;for(B=0;B<p;B++)A[B]=new Array,C[B]=new Array;return d*p%8==4&&(A[d-2][p-2]=1,A[d-1][p-1]=1,A[d-1][p-2]=0,A[d-2][p-1]=0,C[d-2][p-2]=1,C[d-1][p-1]=1,C[d-1][p-2]=1,C[d-2][p-1]=1),this.next(0,d,p,w,A,C),A=this.addFinderPattern(A,c,l,g,f)}},lec:{cInt:function(t,e){for(var r="",n=0;n<e;n++)r+=String.fromCharCode(255&t),t>>=8;return r},cRgb:function(t,e,r){return String.fromCharCode(r)+String.fromCharCode(e)+String.fromCharCode(t)},cHexColor:function(t){var e=parseInt("0x"+t.substr(1)),r=255&e,n=255&(e>>=8),i=e>>8;return this.cRgb(i,n,r)}},bitStringTo2DArray:function(t){var e=[];e[0]=[];for(var r=0;r<t.length;r++)e[0][r]=t.charAt(r);return e},digitToSvgRenderer:function(t,e,r,i,a,o){var s=e.length,h=e[0].length,u=t.width,c=u/h,l=o,g=l*s;if(t.showHRI){var f=n.intval(t.fontSize);g+=n.intval(t.marginHRI)+f}var d='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+u+" "+g+'">';"transparent"!==t.bgColor&&(d+='<rect width="'+u+'" height="'+g+'" x="0" y="0" fill="'+t.bgColor+'"/>');var p,m,v='<rect width="&W" height="'+l+'" x="&X" y="&Y" fill="'+t.color+'"/>';"#000000"===t.color&&(v='<rect width="&W" height="'+l+'" x="&X" y="&Y"/>');for(var D=0;D<s;D++){p=0,m=e[D][0];for(var w=0;w<h;w++)m==e[D][w]?p++:("1"==m&&(d+=v.replace("&W",(p*c).toFixed(1)).replace("&X",((w-p)*c).toFixed(1)).replace("&Y",D*l)),m=e[D][w],p=1);p>0&&"1"==m&&(d+=v.replace("&W",(p*c).toFixed(1)).replace("&X",((h-p)*c).toFixed(1)).replace("&Y",(D*l).toFixed(1)))}return t.showHRI&&(d+='<text transform="translate(50 0)" y="60" text-anchor="middle">'+r+"</text>"),d+="</svg>"},digitToSvg:function(t,e,r,i){var a=n.intval(t.barWidth),o=n.intval(t.barHeight);return this.digitToSvgRenderer(t,this.bitStringTo2DArray(e),r,i,a,o)},digitToSvg2D:function(t,e,r,i){var a=n.intval(t.moduleSize);return this.digitToSvgRenderer(t,e,r,i,a,a)}};e.exports=function(t,e,r,i){var a="",o="",s="",h=!0,u=!1,c=!1;if("string"==typeof t?s=t:"object"==typeof t&&(s="string"==typeof t.code?t.code:"",h=void 0===t.crc||t.crc,u=void 0!==t.rect&&t.rect),""==s)return!1;for(var l in void 0===r&&(r=[]),n.settings)void 0==r[l]&&(r[l]=n.settings[l]);switch(e){case"std25":case"int25":a=n.i25.getDigit(s,h,e),o=n.i25.compute(s,h,e);break;case"ean8":case"ean13":a=n.ean.getDigit(s,e),o=n.ean.compute(s,e);break;case"upc":a=n.upc.getDigit(s),o=n.upc.compute(s);break;case"code11":a=n.code11.getDigit(s),o=s;break;case"code39":a=n.code39.getDigit(s),o=s;break;case"code93":a=n.code93.getDigit(s,h),o=s;break;case"code128":a=n.code128.getDigit(s),o=s;break;case"codabar":a=n.codabar.getDigit(s),o=s;break;case"msi":a=n.msi.getDigit(s,h),o=n.msi.compute(s,h);break;case"datamatrix":a=n.datamatrix.getDigit(s,u),o=s,c=!0}if(0==a.length)return!1;!c&&r.addQuietZone&&(a="0000000000"+a+"0000000000");var g="digitTo"+r.output.charAt(0).toUpperCase()+r.output.substr(1)+(c?"2D":"");return"function"==typeof n[g]?n[g](r,a,o,i):void 0}},{}],3:[function(t,e,r){var n=t("./barcode"),i=t("./qrcode"),a=t("./svg2url");e.exports={barcode:n,qrcode:i,svg2url:a}},{"./barcode":2,"./qrcode":4,"./svg2url":5}],4:[function(t,e,r){function n(t){this.mode=a.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var n=[],i=this.data.charCodeAt(e);i>65536?(n[0]=240|(1835008&i)>>>18,n[1]=128|(258048&i)>>>12,n[2]=128|(4032&i)>>>6,n[3]=128|63&i):i>2048?(n[0]=224|(61440&i)>>>12,n[1]=128|(4032&i)>>>6,n[2]=128|63&i):i>128?(n[0]=192|(1984&i)>>>6,n[1]=128|63&i):n[0]=i,this.parsedData.push(n)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function i(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}n.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},i.prototype={addData:function(t){var e=new n(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=p.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r);this.make();for(var i=0;i<this.modules.length;i++)for(var a=1*i,o=0;o<this.modules[i].length;o++){var s=1*o;this.modules[i][o]&&(n.beginFill(0,100),n.moveTo(s,a),n.lineTo(s+1,a),n.lineTo(s+1,a+1),n.lineTo(s,a+1),n.endFill())}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=p.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],i=t[r];if(null==this.modules[n][i])for(var a=-2;a<=2;a++)for(var o=-2;o<=2;o++)this.modules[n+a][i+o]=-2==a||2==a||-2==o||2==o||0==a&&0==o}},setupTypeNumber:function(t){for(var e=p.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=p.getBCHTypeInfo(r),i=0;i<15;i++){var a=!t&&1==(n>>i&1);i<6?this.modules[i][8]=a:i<8?this.modules[i+1][8]=a:this.modules[this.moduleCount-15+i][8]=a}for(i=0;i<15;i++){a=!t&&1==(n>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=a:i<9?this.modules[8][15-i-1+1]=a:this.modules[8][15-i-1]=a}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,i=7,a=0,o=this.moduleCount-1;o>0;o-=2)for(6==o&&o--;;){for(var s=0;s<2;s++)if(null==this.modules[n][o-s]){var h=!1;a<t.length&&(h=1==(t[a]>>>i&1)),p.getMask(e,n,o-s)&&(h=!h),this.modules[n][o-s]=h,-1==--i&&(a++,i=7)}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}}},i.PAD0=236,i.PAD1=17,i.createData=function(t,e,r){for(var n=w.getRSBlocks(t,e),a=new B,o=0;o<r.length;o++){var s=r[o];a.put(s.mode,4),a.put(s.getLength(),p.getLengthInBits(s.mode,t)),s.write(a)}var h=0;for(o=0;o<n.length;o++)h+=n[o].dataCount;if(a.getLengthInBits()>8*h)throw new Error("code length overflow. ("+a.getLengthInBits()+">"+8*h+")");for(a.getLengthInBits()+4<=8*h&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*h||(a.put(i.PAD0,8),a.getLengthInBits()>=8*h));)a.put(i.PAD1,8);return i.createBytes(a,n)},i.createBytes=function(t,e){for(var r=0,n=0,i=0,a=new Array(e.length),o=new Array(e.length),s=0;s<e.length;s++){var h=e[s].dataCount,u=e[s].totalCount-h;n=Math.max(n,h),i=Math.max(i,u),a[s]=new Array(h);for(var c=0;c<a[s].length;c++)a[s][c]=255&t.buffer[c+r];r+=h;var l=p.getErrorCorrectPolynomial(u),g=new D(a[s],l.getLength()-1).mod(l);o[s]=new Array(l.getLength()-1);for(c=0;c<o[s].length;c++){var f=c+g.getLength()-o[s].length;o[s][c]=f>=0?g.get(f):0}}var d=0;for(c=0;c<e.length;c++)d+=e[c].totalCount;var m=new Array(d),v=0;for(c=0;c<n;c++)for(s=0;s<e.length;s++)c<a[s].length&&(m[v++]=a[s][c]);for(c=0;c<i;c++)for(s=0;s<e.length;s++)c<o[s].length&&(m[v++]=o[s][c]);return m};for(var a={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},o={L:1,M:0,Q:3,H:2},s=0,h=1,u=2,c=3,l=4,g=5,f=6,d=7,p={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;p.getBCHDigit(e)-p.getBCHDigit(p.G15)>=0;)e^=p.G15<<p.getBCHDigit(e)-p.getBCHDigit(p.G15);return(t<<10|e)^p.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;p.getBCHDigit(e)-p.getBCHDigit(p.G18)>=0;)e^=p.G18<<p.getBCHDigit(e)-p.getBCHDigit(p.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return p.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case s:return(e+r)%2==0;case h:return e%2==0;case u:return r%3==0;case c:return(e+r)%3==0;case l:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case g:return e*r%2+e*r%3==0;case f:return(e*r%2+e*r%3)%2==0;case d:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new D([1],0),r=0;r<t;r++)e=e.multiply(new D([1,m.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case a.MODE_NUMBER:return 10;case a.MODE_ALPHA_NUM:return 9;case a.MODE_8BIT_BYTE:case a.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case a.MODE_NUMBER:return 12;case a.MODE_ALPHA_NUM:return 11;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case a.MODE_NUMBER:return 14;case a.MODE_ALPHA_NUM:return 13;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var i=0;i<e;i++){for(var a=0,o=t.isDark(n,i),s=-1;s<=1;s++)if(!(n+s<0||e<=n+s))for(var h=-1;h<=1;h++)i+h<0||e<=i+h||0==s&&0==h||o==t.isDark(n+s,i+h)&&a++;a>5&&(r+=3+a-5)}for(n=0;n<e-1;n++)for(i=0;i<e-1;i++){var u=0;t.isDark(n,i)&&u++,t.isDark(n+1,i)&&u++,t.isDark(n,i+1)&&u++,t.isDark(n+1,i+1)&&u++,0!=u&&4!=u||(r+=3)}for(n=0;n<e;n++)for(i=0;i<e-6;i++)t.isDark(n,i)&&!t.isDark(n,i+1)&&t.isDark(n,i+2)&&t.isDark(n,i+3)&&t.isDark(n,i+4)&&!t.isDark(n,i+5)&&t.isDark(n,i+6)&&(r+=40);for(i=0;i<e;i++)for(n=0;n<e-6;n++)t.isDark(n,i)&&!t.isDark(n+1,i)&&t.isDark(n+2,i)&&t.isDark(n+3,i)&&t.isDark(n+4,i)&&!t.isDark(n+5,i)&&t.isDark(n+6,i)&&(r+=40);var c=0;for(i=0;i<e;i++)for(n=0;n<e;n++)t.isDark(n,i)&&c++;return r+=10*(Math.abs(100*c/e/e-50)/5)}},m={glog:function(t){if(t<1)throw new Error("glog("+t+")");return m.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return m.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},v=0;v<8;v++)m.EXP_TABLE[v]=1<<v;for(v=8;v<256;v++)m.EXP_TABLE[v]=m.EXP_TABLE[v-4]^m.EXP_TABLE[v-5]^m.EXP_TABLE[v-6]^m.EXP_TABLE[v-8];for(v=0;v<255;v++)m.LOG_TABLE[m.EXP_TABLE[v]]=v;function D(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}function w(t,e){this.totalCount=t,this.dataCount=e}function B(){this.buffer=[],this.length=0}D.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=m.gexp(m.glog(this.get(r))+m.glog(t.get(n)));return new D(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=m.glog(this.get(0))-m.glog(t.get(0)),r=new Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(n=0;n<t.getLength();n++)r[n]^=m.gexp(m.glog(t.get(n))+e);return new D(r,0).mod(t)}},w.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],w.getRSBlocks=function(t,e){var r=w.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=[],a=0;a<n;a++)for(var o=r[3*a+0],s=r[3*a+1],h=r[3*a+2],u=0;u<o;u++)i.push(new w(s,h));return i},w.getRsBlockTable=function(t,e){switch(e){case o.L:return w.RS_BLOCK_TABLE[4*(t-1)+0];case o.M:return w.RS_BLOCK_TABLE[4*(t-1)+1];case o.Q:return w.RS_BLOCK_TABLE[4*(t-1)+2];case o.H:return w.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},B.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var A=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function C(t){if(this.options={padding:0,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},"string"==typeof t&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if("string"!=typeof this.options.content)throw new Error("Expected 'content' as string!");if(0===this.options.content.length)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var r=this.options.content,n=function(t,e){for(var r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),n=1,i=0,a=0,o=A.length;a<=o;a++){var s=A[a];if(!s)throw new Error("Content too long: expected "+i+" but got "+r);switch(e){case"L":i=s[0];break;case"M":i=s[1];break;case"Q":i=s[2];break;case"H":i=s[3];break;default:throw new Error("Unknwon error correction level: "+e)}if(r<=i)break;n++}if(n>A.length)throw new Error("Content too long");return n}(r,this.options.ecl),a=function(t){switch(t){case"L":return o.L;case"M":return o.M;case"Q":return o.Q;case"H":return o.H;default:throw new Error("Unknwon error correction level: "+t)}}(this.options.ecl);this.qrcode=new i(n,a),this.qrcode.addData(r),this.qrcode.make()}C.prototype.svg=function(){for(var t=this.options,e=this.qrcode.modules,r=t.width,n=t.height,i=e.length,a=r/(i+2*t.padding),o=n/(i+2*t.padding),s='<rect x="0" y="0" width="'+r+'" height="'+n+'" style="fill:'+t.background+';shape-rendering:crispEdges;"/>',h=0;h<i;h++)for(var u=0;u<i;u++){if(e[u][h])s+='<rect x="'+(u*a+t.padding*a).toString()+'" y="'+(h*o+t.padding*o).toString()+'" width="'+a+'" height="'+o+'" style="fill:'+t.color+';shape-rendering:crispEdges;"/>'}var c='<?xml version="1.0" standalone="yes"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+r+'" height="'+n+'">';return c+=s,c+="</svg>"},e.exports=function(t){return new C(t).svg()}},{}],5:[function(t,e,r){e.exports=function(t){return"data:image/svg+xml;utf8,"+encodeURIComponent(t)}},{}]},{},[1])(1)});
