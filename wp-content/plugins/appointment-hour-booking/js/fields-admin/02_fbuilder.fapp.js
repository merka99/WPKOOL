	$.fbuilder.typeList.push(
		{
			id:"fapp",
			name:"Appointment",
			control_category:1
		}
	);
	$.fbuilder.controls[ 'fapp' ]=function(){  this.init();  };
	$.extend(
		$.fbuilder.controls[ 'fapp' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Appointment",
			ftype:"fapp",			
			services:new Array({name:"Sample Service",price:24.99,duration:60}),
			openhours:new Array({type:"all",d:"",h1:8,m1:0,h2:17,m2:0}),
			dateFormat:"mm/dd/yy",
			showDropdown:false,
			showTotalCost:false,
			showTotalCostFormat:"$ {0}",
			showEndTime:false,
			usedSlotsCheckbox:false,
			dropdownRange:"-10:+10",
			working_dates:[true,true,true,true,true,true,true],
			numberOfMonths:1,
			maxNumberOfApp:0,
			firstDay:0,
			minDate:"0",
			maxDate:"",
			defaultDate:"",
			invalidDates:"",
			tmpinvalidDates:[],
			required:true,
			bSlotsCheckbox: true,
			bSlots:30,
			militaryTime:1,
			display:function()
				{
					return '<div class="fields '+this.name+' fapp" id="field'+this.form_identifier+'-'+this.index+'"><div class="arrow ui-icon ui-icon-play "></div><div title="Duplicate" class="copy ui-icon ui-icon-copy "></div><div title="Delete" class="remove ui-icon ui-icon-trash "></div><label>'+this.title+''+((this.required)?"*":"")+'</label><div class="dfield"><div class="fieldCalendarService'+this.name+'"></div><div class="fieldCalendar'+this.name+'"></div><div class="slotsCalendar'+this.name+'"></div><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			msort:function(arr){
                for(var i =0;i<arr.length;i++){
                    for(var j= i+1;j<arr.length;j++){
                        if(arr[i].type>arr[j].type || (arr[i].type==arr[j].type && arr[i].type=="special" && arr[i].d>arr[j].d) || (arr[i].type==arr[j].type && arr[i].type!="special" && arr[i].h1*60+arr[i].m1>arr[j].h1*60+arr[j].m1)){
                            var swap = arr[i];
                            arr[i] = arr[j];
                            arr[j] = swap;
                        }
                    }
                }
                return arr;
            },	
			showSlots:function()
					{		
						  function isOpen(h,m,s)
					    {                
					    	  for (var i=0;i<s.length;i++)
					            if ((h*60+m>=s[i].h1*60+s[i].m1) && (h*60+m<=s[i].h2*60+s[i].m2))
					                return "sopen";
					        return "";        
					    }			    
					     var slots = '';//
					     for (var i=0;i<24;i++)
					     {
					         slots += '<div><div>'+i+'</div>';
					         for (var j=0;j<60;j=j+5)
					             slots += '<div id="d'+i+'-'+j+'" class="slot '+isOpen(i,j,this.slots)+'" ></div>';
					         slots += '</div>';
					     }
					     return slots+this.slots.length;
					     //return this.slots.length;
				  } ,	
			editItemEvents:function()
					{
						
						
            var me = this;
						$(".openhours_special").datepicker({dateFormat:"yy-mm-dd",
							onSelect: function(d,inst) {							
								me.openhours[inst.input.attr("i")].d = d;
								$.fbuilder.reloadItems({'field':me});
             	}});
						var evt = [
						  {s:"#sDateFormat",e:"change", l:"dateFormat"},
							{s:"#sNumberOfMonths",e:"change", l:"numberOfMonths"},
							{s:"#sMaxNumberOfApp",e:"change", l:"maxNumberOfApp"},
							
							{s:"#sFirstDay",e:"change", l:"firstDay"},
							{s:"#sMilitaryTime",e:"change", l:"militaryTime"},
							
							{s:"#sMinDate",e:"change", l:"minDate"},
							{s:"#sMaxDate",e:"change", l:"maxDate"},
							{s:"#sInvalidDates",e:"change", l:"invalidDates"},
							{s:"#sDefaultDate",e:"change", l:"defaultDate"},
							{s:"#sDropdownRange",e:"keyup", l:"dropdownRange"},
							{s:"#sShowTotalCostFormat",e:"keyup", l:"showTotalCostFormat"},
							{s:"#sBSlotsCheckbox",e:"click", l:"bSlotsCheckbox", f:function(el){
								var v = el.is(':checked'); 
								$("#sBSlotsDiv")[( v ) ? 'hide' : 'show']();
								$("#sBUsedSlotsDiv")[( v ) ? 'show' : 'hide']();
								
								return v;
								}
							},
							{s:"#sBSlots",e:"change", l:"bSlots"},							
							{s:"#sShowEndTime",e:"click", l:"showEndTime", f:function(el){
								return el.is(':checked');
								}
							},
							{s:"#sUsedSlotsCheckbox",e:"click", l:"usedSlotsCheckbox", f:function(el){
								return el.is(':checked');
								}
							},
							{s:"#sShowTotalCost",e:"click", l:"showTotalCost", f:function(el){
								var v = el.is(':checked'); 
								$("#divTotalCostFormat")[( v ) ? 'show' : 'hide']();
								return v;
								}
							},
							{s:"#sShowDropdown",e:"click", l:"showDropdown", f:function(el){
								var v = el.is(':checked'); 
								$("#divdropdownRange")[( v ) ? 'show' : 'hide']();
								return v;
								}
							}
						];
						$(".working_dates input").bind("click", {obj: this}, function(e) {
						  e.data.obj.working_dates[$(this).val()] = $(this).is(':checked');
							$.fbuilder.reloadItems({'field':e.data.obj});
					  });
						$(".service_name").bind("keyup", {obj: this}, function(e) 
						{
							e.data.obj.services[$(this).attr("i")].name= $(this).val();
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
					  $(".service_price").bind("keyup", {obj: this}, function(e) 
						{
							e.data.obj.services[$(this).attr("i")].price= $(this).val();
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".service_duration").bind("change", {obj: this}, function(e) 
						{
							e.data.obj.services[$(this).attr("i")].duration= $(this).val();
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
					  $(".services .choice_up").bind("click", {obj: this}, function(e) 
						{
							var i = $(this).attr("i")*1;
							if (i!=0)
							{
								e.data.obj.services.splice(i-1, 0, e.data.obj.services.splice(i, 1)[0]);
							}
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
					  $(".services .choice_down").bind("click", {obj: this}, function(e) 
						{
							var i = $(this).attr("i")*1;
							var n = $(this).attr("n")*1;
							if (i!=n)
							{
								e.data.obj.services.splice(i, 0, e.data.obj.services.splice(i+1, 1)[0]);
							}
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
					  $(".services .choice_add").bind("click", {obj: this}, function(e) 
						{
							e.data.obj.services.splice($(this).attr("i")*1+1,0,{name:"Sample Service",price:24.99,duration:60});
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".services .choice_remove").bind("click", {obj: this}, function(e) 
						{
							if (e.data.obj.services.length>1)
								e.data.obj.services.splice( $(this).attr("i")*1, 1 )							
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".openhours_type").bind("change", {obj: this}, function(e) 
						{
							e.data.obj.openhours[$(this).attr("i")].type= $(this).val();
							if ($(this).val()=="special")
							    $(this).parents(".choicesEdit").find(".openhours_special").css("visibility","visible");
							else
								  $(this).parents(".choicesEdit").find(".openhours_special").css("visibility","hidden");    
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".openhours_from").bind("change", {obj: this}, function(e) 
						{
							e.data.obj.openhours[$(this).attr("i")].h1= $(this).find(":selected").attr("h");
							e.data.obj.openhours[$(this).attr("i")].m1= $(this).find(":selected").attr("m");
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".openhours_to").bind("change", {obj: this}, function(e) 
						{
							e.data.obj.openhours[$(this).attr("i")].h2= $(this).find(":selected").attr("h");
							e.data.obj.openhours[$(this).attr("i")].m2= $(this).find(":selected").attr("m");
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
					  $(".openhours .choice_add").bind("click", {obj: this}, function(e) 
						{
							e.data.obj.openhours.splice($(this).attr("i")*1+1,0,{type:"all",d:"",h1:8,m1:0,h2:17,m2:0});    
							e.data.obj.openhours = me.msort(e.data.obj.openhours);
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$(".openhours .choice_remove").bind("click", {obj: this}, function(e) 
						{
							if (e.data.obj.openhours.length>1)
								e.data.obj.openhours.splice( $(this).attr("i")*1, 1 )							
							$.fbuilder.editItem(e.data.obj.index);
							$.fbuilder.reloadItems({'field':e.data.obj});
						});
						$.fbuilder.controls[ 'ffields' ].prototype.editItemEvents.call(this, evt);
					},
			after_show:function()
			  {
			  	  function onChangeDateOrService(d)
			  	  {
			  	  	  function formattime(t)
								{
								    var h = Math.floor(t/60);
								    var m = t%60;
								    var suffix = "";
								    if (me.militaryTime==0)
								    {
								        if (h>12)
								        {
								            h = h-12;
								            suffix = " PM";
								        }
								        else if (h==12)
								            suffix = " PM"; 
								        else
								            suffix = " AM";    
								    }
									  return (((h<10)?"":"")+h+":"+(m<10?"0":"")+m)+suffix;									
								}
								function getSlots(arr, duration, bduration)
								{
									var str = "";
									var a1 = new Array();
									var minutesStart = 0;
			    		            if (me.minDate==="0" && $.datepicker.formatDate("yy-mm-dd",new Date()) == d)
			    		            { 
			    		                var current = new Date();
			    		                minutesStart = (current.getTime() - $.datepicker.parseDate("yy-mm-dd",d).getTime())/(1000*60);
			    		            };
								    for (var i=0;i<arr.length;i++)
									{
										
										st = arr[i].h1*60+arr[i].m1*1;
										et = arr[i].h2*60+arr[i].m2*1;
										if (st >= et)
			  			                    et += 24 * 60; 
										while (st+duration<=et  && st<24 * 60)
										{
										    if ($.inArray(st ,a1)==-1 )
										        if (st>=minutesStart)
										            a1[a1.length] = st;
										    st += bduration;
										}
								  }
								  a1.sort(function (a, b) {return a - b;});
								  for (var i=0;i<a1.length;i++)
								      str+= "<div>"+formattime(a1[i])+(me.showEndTime?("-"+formattime(a1[i]+duration)):"")+"</div>";
								  return str;	
								}
								var arr = new Array();								
								var day = d;
								var s = $( '#field' + me.form_identifier + '-' + me.index + ' .slotsCalendar'+me.name );
								//me.openhours = me.msort(me.openhours);
								for (var i=0;i<me.openhours.length;i++)
								{
									if (me.openhours[i].type=="special")
								  {
								  	  arr[me.openhours[i].d] = arr[me.openhours[i].d] || [];
								  	  arr[me.openhours[i].d][arr[me.openhours[i].d].length] = me.openhours[i];
								  }
								  else
								  {
								      arr[me.openhours[i].type] = arr[me.openhours[i].type] || [];
								      arr[me.openhours[i].type][arr[me.openhours[i].type].length] = me.openhours[i];	
								  }        
								}
								var duration = $(".fieldCalendarService"+me.name+" select option:selected").val()*1;
								var bduration = duration;
								if (!me.bSlotsCheckbox)
								    bduration = me.bSlots*1;
								var st, et, str = ""; 
								if (arr[d])
								    str = getSlots(arr[d],duration,bduration);
								else if (arr["d"+$.datepicker.parseDate('yy-mm-dd', d).getDay()])
									  str = getSlots(arr["d"+$.datepicker.parseDate('yy-mm-dd', d).getDay()],duration,bduration);
								else if (arr["all"])
									  str = getSlots(arr["all"],duration,bduration);	  
								s.html("<div class=\"slots\">"+$.datepicker.formatDate(me.dateFormat, $.datepicker.parseDate("yy-mm-dd", d))+"<br />"+str+"</div>");
			  	  }
			  	var me  = this,
						e   = $( '#field' + me.form_identifier + '-' + me.index + ' .fieldCalendar'+me.name ),
						d   = $( '#field' + me.form_identifier + '-' + me.index + ' .fieldCalendarService'+me.name ),
						str = "",
						op = "";				
						for (var i=0;i<me.services.length;i++)
						    str += '<option value="'+me.services[i].duration+'">'+me.services[i].name+'</option>';
						d.html('<select>'+str+'</select>');
						$(".fieldCalendarService"+me.name+" select").bind("change", function() 
						{
							if (e.datepicker("getDate"))
							    onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', e.datepicker("getDate")))
						});
						this.tmpinvalidDates = this.invalidDates;
						this.tmpinvalidDates = this.tmpinvalidDates.replace( /\s+/g, '' );
					  if( !/^\s*$/.test( this.tmpinvalidDates ) )
					  {
					  	  var	dateRegExp = new RegExp( /^\d{1,2}\/\d{1,2}\/\d{4}$/ ),
					  	      counter = 0,
					  	      dates = this.tmpinvalidDates.split( ',' );
					  	  this.tmpinvalidDates = [];
					  	  for( var i = 0, h = dates.length; i < h; i++ )
					  	  {
					  	  	  var range = dates[ i ].split( '-' );
                    
					  	  	  if( range.length == 2 && range[0].match( dateRegExp ) != null && range[1].match( dateRegExp ) != null )
					  	  	  {
					  	  	  	  var fromD = new Date( range[ 0 ] ),
					  	  	  	  	  toD = new Date( range[ 1 ] );
					  	  	  	  while( fromD <= toD )
					  	  	  	  {
					  	  	  	  	  this.tmpinvalidDates[ counter ] = fromD;
					  	  	  	  	  var tmp = new Date( fromD.valueOf() );
					  	  	  	  	  tmp.setDate( tmp.getDate() + 1 );
					  	  	  	  	  fromD = tmp;
					  	  	  	  	  counter++;
					  	  	  	  }
					  	  	  }
					  	  	  else
					  	  	  {
					  	  	  	  for( var j = 0, k = range.length; j < k; j++ )
					  	  	  	  {
					  	  	  	  	  if( range[ j ].match( dateRegExp ) != null )
					  	  	  	  	  {
					  	  	  	  	  	  this.tmpinvalidDates[ counter ] = new Date( range[ j ] );
					  	  	  	  	  	  counter++;
					  	  	  	  	  }
					  	  	  	  }
					  	  	  }
					  	  }
					  }
						e.datepicker({numberOfMonths:parseInt(me.numberOfMonths),
							firstDay:parseInt(me.firstDay),
							minDate:me.minDate,
							maxDate:me.maxDate,
							dateFormat:me.dateFormat,
							defaultDate:me.defaultDate,
							changeMonth: me.showDropdown, 
							changeYear: me.showDropdown,
							yearRange: ((me.showDropdown)?me.dropdownRange:""),
							onSelect: function(d,inst) {
								onChangeDateOrService($.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate(me.dateFormat, d)));
             	},
							beforeShowDay: function (d) {
								    var day = $.datepicker.formatDate('yy-mm-dd', d);
                    var c =  new Array(day);
                    if (me.working_dates[d.getDay()]==0)
                        c.push("nonworking");
                    for( var i = 0, l = me.tmpinvalidDates.length; i < l; i++ )
                    {
                    	if (d.getTime() === me.tmpinvalidDates[i].getTime())
                    	   c.push("nonworking invalidDate");
                    }    
                    return [true,c.join(" ")];
		          }
		        });
		        me.tmpinvalidDatestime = new Array();
            for (var i=0;i<me.tmpinvalidDates.length;i++)
                me.tmpinvalidDatestime[i]=me.tmpinvalidDates[i].getTime();
            function DisableSpecificDates(date) {
                var currentdate = date.getTime();
                if ($.inArray(currentdate, me.tmpinvalidDatestime) > -1 ) 
                    return false;
                if (me.working_dates[date.getDay()]==0)
                    return false; 
                return true;
            }
            var sum = 0;
            for (var i=0;i<me.working_dates.length;i++)
                sum += me.working_dates[i];
            if (sum>0)
            {       
		           var nextdateAvailable = e.datepicker("getDate");
               while (!DisableSpecificDates(nextdateAvailable))
                   nextdateAvailable.setDate(nextdateAvailable.getDate() + 1);
		           e.datepicker("setDate", nextdateAvailable);    
		           onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', nextdateAvailable));
		        }
		        
		        
				},
			showSpecialDataInstance: function() 
				{
					var str = "", e   = $( '#field' + this.form_identifier + '-' + this.index + ' .fieldCalendar'+this.name ),dayNames  = e.datepicker( "option", "dayNames" );
					
					str += '<div class="choicesSet services"><label>Services [<a class="helpfbuilder" text="Add the services offered: service name, price (number only, without currency symbol or code) and its duration">help?</a>]</label><div><div class="labelN">Name</div><div class="labelP">Price</div><div class="labelD">Duration</div><div class="clearer"></div></div>';
					for (var i=0;i<this.services.length;i++)
					{
						  str += '<div class="choicesEdit"><input class="service_name" i="'+i+'" type="text" name="sService'+this.name+'" id="sService'+this.name+'" value="'+$.fbuilder.htmlEncode(this.services[i].name)+'"/><input class="service_price" i="'+i+'" type="text" name="sService'+this.name+'P'+i+'" id="sService'+this.name+'P'+i+'" value="'+$.fbuilder.htmlEncode(this.services[i].price)+'"/>';
						  str += '<select class="service_duration" i="'+i+'" name="sService'+this.name+'D'+i+'" id="sService'+this.name+'D'+i+'">';
						  for (var j=1;j<=24*12;j++)
						      str += '<option value="'+(5*j)+'" '+((this.services[i].duration==5*j)?"selected":"")+'>'+(5*j)+' min</option>';    
						  str += '</select>';
						  str += '<a class="choice_down ui-icon ui-icon-arrowthick-1-s" i="'+i+'" n="'+(this.services.length-1)+'" title="Down"></a><a class="choice_up ui-icon ui-icon-arrowthick-1-n" i="'+i+'" title="Up"></a><a class="choice_add ui-icon ui-icon-circle-plus" i="'+i+'" title="Add another choice."></a><a class="choice_remove ui-icon ui-icon-circle-minus" i="'+i+'" title="Delete this choice."></a></div>';
						
					}
					str += '<div><input type="checkbox"  name="sBSlotsCheckbox" id="sBSlotsCheckbox" '+((this.bSlotsCheckbox)?"checked":"")+'/> Generate time slots automatically based on service duration';
					str += '<div id="sBUsedSlotsDiv" style="display:'+((this.bSlotsCheckbox)?"block":"none")+'"><input type="checkbox"  name="sUsedSlotsCheckbox" id="sUsedSlotsCheckbox" '+((this.usedSlotsCheckbox)?"checked":"")+'/> Show used slots</div>';
					str += '<div id="sBSlotsDiv" style="display:'+((this.bSlotsCheckbox)?"none":"block")+'">Generate slots every <select class="BSlots" name="sBSlots" id="sBSlots">';
					for (var j=1;j<=24*12;j++)
					    str += '<option value="'+(5*j)+'" '+((this.bSlots==5*j)?"selected":"")+'>'+(5*j)+' min</option>';    
						  str += '</select></div></div>';
					str += '</div>';
					str += '<div class="choicesSet openhours"><label>Open hours [<a class="helpfbuilder" text="Open hours for all dates, for each weekday or specific date. Examples: \n\n - For all days: All days from 08:00 to 17:00 hours. \n\n - For specific weekdays: Mondays from 08:00 to 17:00 hours. \n\n - For specific dates: 27/12/2018 from 08:00 to 10:00 hours.">help?</a>]</label><div><div class="labelT">Day(s)</div><div class="labelF">From</div><div class="labelF">To</div><div class="clearer"></div></div>';
					for (var i=0;i<this.openhours.length;i++)
					{
						  str += '<div class="choicesEdit">';
						  str += '<select class="openhours_type" i="'+i+'" "><option value="all" '+((this.openhours[i].type=='all')?"selected":"")+'>All days</option>';
						  for (var d=0;d<7;d++)
						      str += '<option value="d'+d+'" '+((this.openhours[i].type=="d"+d)?"selected":"")+'>'+dayNames[d]+'</option>';
						  str += '<option value="special" '+((this.openhours[i].type=='special')?"selected":"")+'>Only ...</option></select>';
						  str += '<input style="visibility:'+((this.openhours[i].type=="special")?"visible":"hidden")+'" class="openhours_special" i="'+i+'" type="text"  value="'+$.fbuilder.htmlEncode(this.openhours[i].d)+'"/>';
						  str += '<select class="openhours_from" i="'+i+'">';
						  for (var h=0;h<24;h++)
						    for (var m=0;m<60;m=m+5)
						      str += '<option h="'+h+'" m="'+m+'" value="'+((h<10)?"0":"")+h+":"+((m<10)?"0":"")+m+'" '+((this.openhours[i].h1==h && this.openhours[i].m1==m)?"selected":"")+'>'+((h<10)?"0":"")+h+":"+((m<10)?"0":"")+m+'</option>';    
						  str += '</select>';
						  str += '<select class="openhours_to" i="'+i+'">';
						  for (var h=0;h<24;h++)
						    for (var m=0;m<60;m=m+5)
						      str += '<option h="'+h+'" m="'+m+'" value="'+((h<10)?"0":"")+h+":"+((m<10)?"0":"")+m+'" '+((this.openhours[i].h2==h && this.openhours[i].m2==m)?"selected":"")+'>'+((h<10)?"0":"")+h+":"+((m<10)?"0":"")+m+'</option>';    
						  str += '</select>';
						  str += '<a class="choice_add ui-icon ui-icon-circle-plus" i="'+i+'" title="Add another choice."></a><a class="choice_remove ui-icon ui-icon-circle-minus" i="'+i+'" title="Delete this choice."></a></div>';
						
					}
					str += '</div>';
					str += '<div class="working_dates"><label>Working dates </label><br /><input name="sWD0" id="sWD0" value="0" type="checkbox" '+((this.working_dates[0])?"checked":"")+'/>Su<input name="sWD1" id="sWD1" value="1" type="checkbox" '+((this.working_dates[1])?"checked":"")+'/>Mo<input name="sWD2" id="sWD2" value="2" type="checkbox" '+((this.working_dates[2])?"checked":"")+'/>Tu<input name="sWD3" id="sWD3" value="3" type="checkbox" '+((this.working_dates[3])?"checked":"")+'/>We<input name="sWD4" id="sWD4" value="4" type="checkbox" '+((this.working_dates[4])?"checked":"")+'/>Th<input name="sWD5" id="sWD5" value="5" type="checkbox" '+((this.working_dates[5])?"checked":"")+'/>Fr<input name="sWD6" id="sWD6" value="6" type="checkbox" '+((this.working_dates[6])?"checked":"")+'/>Sa</div>';
					var sfirst = "";
					for (var i=0;i<7;i++)
					{
						sfirst += '<option value="'+i+'" '+((i==this.firstDay)?"selected":"")+'>'+dayNames[i]+'</option>';
					}
					str += '<div><label>First Date</label><br /><label><select name="sFirstDay" id="sFirstDay">'+sfirst+'</select></div>';
					var snumberOfM = "";
					for (var i=1;i<=12;i++)
					{
						snumberOfM += '<option value="'+i+'" '+((i==this.numberOfMonths)?"selected":"")+'>'+i+'</option>';
					}
					str += '<div><label>Military Time</label><br /><label><select name="sMilitaryTime" id="sMilitaryTime"><option value="1" '+((1==this.militaryTime)?"selected":"")+'>Yes (24 hours)</option><option value="0" '+((1!=this.militaryTime)?"selected":"")+'>No (12 hours AM/PM)</option></select></div>';
          str += '<div><label>Number of months</label><br /><label><select name="sNumberOfMonths" id="sNumberOfMonths">'+snumberOfM+'</select></div>';
					var snumberOfApp = "";
					for (var i=0;i<=10;i++)
					{
						snumberOfApp += '<option value="'+i+'" '+((i==this.maxNumberOfApp)?"selected":"")+'>'+((i==0)?"Unlimited":i)+'</option>';
					}
					str += '<div><label>Max number of appointments</label><br /><label><select name="sMaxNumberOfApp" id="sMaxNumberOfApp">'+snumberOfApp+'</select></div>';
					str += '<div><label>Default date [<a class="helpfbuilder" text="You can put one of the following type of values into this field:\n\nEmpty: Leave empty for current date.\n\nDate: A Fixed date with the same date format indicated in the &quot;Date Format&quot; drop-down field.\n\nNumber: A number of days from today. For example 2 represents two days from today and -1 represents yesterday.\n\nString: A smart text indicating a relative date. Relative dates must contain value (number) and period pairs; valid periods are &quot;y&quot; for years, &quot;m&quot; for months, &quot;w&quot; for weeks, and &quot;d&quot; for days. For example, &quot;+1m +7d&quot; represents one month and seven days from today.">help?</a>]</label><br /><input class="medium" name="sDefaultDate" id="sDefaultDate" value="'+$.fbuilder.htmlEncode(this.defaultDate)+'" /></div>';
					str += '<div><label>Min date [<a class="helpfbuilder" text="You can put one of the following type of values into this field:\n\nEmpty: No min Date.\n\nDate: A Fixed date with the same date format indicated in the &quot;Date Format&quot; drop-down field.\n\nNumber: A number of days from today. For example 2 represents two days from today and -1 represents yesterday.\n\nString: A smart text indicating a relative date. Relative dates must contain value (number) and period pairs; valid periods are &quot;y&quot; for years, &quot;m&quot; for months, &quot;w&quot; for weeks, and &quot;d&quot; for days. For example, &quot;+1m +7d&quot; represents one month and seven days from today.">help?</a>]</label><br /><input class="medium" name="sMinDate" id="sMinDate" value="'+$.fbuilder.htmlEncode(this.minDate)+'" /></div>';
					str += '<div><label>Max date [<a class="helpfbuilder" text="You can put one of the following type of values into this field:\n\nEmpty: No max Date.\n\nDate: A Fixed date with the same date format indicated in the &quot;Date Format&quot; drop-down field.\n\nNumber: A number of days from today. For example 2 represents two days from today and -1 represents yesterday.\n\nString: A smart text indicating a relative date. Relative dates must contain value (number) and period pairs; valid periods are &quot;y&quot; for years, &quot;m&quot; for months, &quot;w&quot; for weeks, and &quot;d&quot; for days. For example, &quot;+1m +7d&quot; represents one month and seven days from today.">help?</a>]</label><br /><input class="medium" name="sMaxDate" id="sMaxDate" value="'+$.fbuilder.htmlEncode(this.maxDate)+'" /></div>';
          str += '<div><label>Invalid Dates [<a class="helpfbuilder" text="To define some dates as invalid, enter the dates with the format: mm/dd/yyyy separated by comma; for example: 12/31/2014,02/20/2014 or by hyphen for intervals; for example: 12/20/2014-12/28/2014 ">help?</a>]</label><br /><input class="medium" name="sInvalidDates" id="sInvalidDates" value="'+$.fbuilder.htmlEncode(this.invalidDates)+'" /></div>';
          str += '<div><input type="checkbox" name="sShowDropdown" id="sShowDropdown" '+((this.showDropdown)?"checked":"")+'/><label>Show Dropdown Year and Month</label><div id="divdropdownRange" style="display:'+((this.showDropdown)?"":"none")+'">Year Range [<a class="helpfbuilder" text="The range of years displayed in the year drop-down: either relative to today\'s year (&quot;-nn:+nn&quot;), absolute (&quot;nnnn:nnnn&quot;), or combinations of these formats (&quot;nnnn:-nn&quot;)">help?</a>]: <input type="text" name="sDropdownRange" id="sDropdownRange" value="'+$.fbuilder.htmlEncode(this.dropdownRange)+'"/></div></div>';
					str += '<div><input type="checkbox" name="sShowEndTime" id="sShowEndTime" '+((this.showEndTime)?"checked":"")+'/><label>Show end time [<a class="helpfbuilder" text="If enabled it will display the end time for each time-slot based in the duration of the selected service.">help?</a>]</label></div>';
					str += '<div><input type="checkbox" name="sShowTotalCost" id="sShowTotalCost" '+((this.showTotalCost)?"checked":"")+'/><label>Show Total Cost</label><div id="divTotalCostFormat" style="display:'+((this.showTotalCost)?"":"none")+'">Total cost format [<a class="helpfbuilder" text="The string {0} will be replaced with the calculated cost. Keep the {0} reference. You can edit the currency symbol or add additional text.">help?</a>]: <input type="text" name="sShowTotalCostFormat" id="sShowTotalCostFormat" value="'+$.fbuilder.htmlEncode(this.showTotalCostFormat)+'"/></div></div>';
					
					
					str += '<hr></hr>';
					return str;
				}
		}
	);