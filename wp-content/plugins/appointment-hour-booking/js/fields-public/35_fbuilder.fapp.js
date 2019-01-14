$.fbuilder.controls[ 'fapp' ] = function(){};
$.extend( 
	$.fbuilder.controls[ 'fapp' ].prototype, 
	$.fbuilder.controls[ 'ffields' ].prototype,
	{
		title:"Number",
		ftype:"fapp",			
		services:new Array({name:"Service 1",price:1,duration:60}),
		openhours:new Array({type:"all",d:"",h1:8,m1:0,h2:17,m2:0}),
		usedSlots:new Array(),
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
		required:true,			
		bSlotsCheckbox: true,
		bSlots:30,
		militaryTime:1,
		cacheArr:new Array(),
		getD:new Date(),
		formId:0,
		arr:new Array(),
		allUsedSlots:new Array(),
		invalidDatesByDuration:new Array(),
		tz:0,
		htmlUsedSlots:new Array(),
		show:function()
		{
		    return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input class="field '+((this.required)?" required":"")+'" id="'+this.name+'" name="'+this.name+'" type="hidden" value="" summary="usedSlots"/><input id="'+this.name+'_services" name="'+this.name+'_services" type="hidden" value="0"/><input class="" id="tcost'+this.name+'" name="tcost'+this.name+'" type="hidden" value=""/><div class="fieldCalendarService'+this.name+'"></div><div class="fieldCalendar'+this.name+'"></div><div class="slotsCalendar'+this.name+'"></div><div class="usedSlots'+this.name+'"></div><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
		},
        getAvailablePartialSlots: function(d, part) 
        {     
            var me  = this; 
            if (!me.cacheOpenHours)
            {
                var arr = new Array();
			  	for (var i=0;i<me.openhours.length;i++)
			  	{
			  	    if (me.openhours[i].type=="special")
			  	    {
			  	    	arr[me.openhours[i].d] = arr[me.openhours[i].d] || [];
			  	    	arr[me.openhours[i].d][arr[me.openhours[i].d].length] = jQuery.extend({}, me.openhours[i]);
			  	    }
			  	    else
			  	    {
			  	        arr[me.openhours[i].type] = arr[me.openhours[i].type] || [];
			  	        arr[me.openhours[i].type][arr[me.openhours[i].type].length] = jQuery.extend({}, me.openhours[i]);	
			  	    }        
			  	}
			  	me.cacheOpenHours = arr;
            }
            if (!me.arr[d])
            {
                var a = new Array();
			  	if (me.cacheOpenHours[d])
			  	    a = me.cacheOpenHours[d].slice(0);
			  	else if (me.cacheOpenHours["d"+$.datepicker.parseDate("yy-mm-dd", d).getDay()])
			  		a = me.cacheOpenHours["d"+$.datepicker.parseDate("yy-mm-dd", d).getDay()].slice(0);
			  	else if (me.cacheOpenHours["all"])
			  		a = me.cacheOpenHours["all"].slice(0);
			  	me.arr[d]	= a;
			  			  
            }
            if (!me.duration)
            {
                var arr = new Array();
                return arr;
            }   
            var data1 = me.cacheArr[d];
            if (!data1) data1 = new Array();
            var duration = me.duration;
			var bduration = me.bduration;
			var arr = new Array();
			for (var i=0;i<me.arr[d].length;i++)
			    arr[i] = jQuery.extend({}, me.arr[d][i]);			  		 	      
            for (var i=0;i<arr.length;i++)
			{
				arr[i].t1 = arr[i].h1 * 60 + arr[i].m1*1;
				arr[i].t2 = arr[i].h2 * 60 + arr[i].m2*1;
				if (arr[i].t1>=arr[i].t2)
				    arr[i].t2 += 24 * 60;
			}
			me.usedSlots[d] = me.usedSlots[d] || [];
			part.t1 = part.h1 * 60 + part.m1;
			part.t2 = part.h2 * 60 + part.m2;
			data = $.merge(data1.slice(0),me.usedSlots[d]);
			data = $.merge(data,part);				  		
			for (var i=0;i<data.length;i++)
			{
			    data[i].t1 = data[i].h1 * 60 + data[i].m1*1;
			    data[i].t2 = data[i].h2 * 60 + data[i].m2*1;			  			  
			    for (var j=0;j<arr.length;j++)
			    {
			        if ((data[i].t1 > arr[j].t1) && (data[i].t1 < arr[j].t2)   &&  (data[i].t2 > arr[j].t1) && (data[i].t2 < arr[j].t2))
			        {
			        	var v1 = {t1:arr[j].t1,  t2:data[i].t1,   h1:arr[j].h1,  h2:data[i].h1,   m1:arr[j].m1,  m2:data[i].m1};
			        	var v2 = {t1:data[i].t2, t2:arr[j].t2,    h1:data[i].h2, h2:arr[j].h2,    m1:data[i].m2, m2:arr[j].m2};
			            arr.splice(j, 1, v1, v2);
			        }
			        else if ((data[i].t1 > arr[j].t1) && (data[i].t1 < arr[j].t2))
			        {
			        	arr[j].t2 = data[i].t1;
			        	arr[j].h2 = data[i].h1;
			        	arr[j].m2 = data[i].m1;
			        } 
			        else if ((data[i].t2 > arr[j].t1) && (data[i].t2 < arr[j].t2))
			        {
			        	arr[j].t1 = data[i].t2;
			        	arr[j].h1 = data[i].h2;
			        	arr[j].m1 = data[i].m2;
			        }
			        else if ((data[i].t1 <= arr[j].t1) && (data[i].t2 >= arr[j].t2))
			        {
			        	arr.splice(j, 1);
			        }
			    }
			}
			for (var i=arr.length-1;i>=0;i--)
			    if (arr[i].t1+me.duration > arr[i].t2 || arr[i].t1 > 24*60)
                    arr.splice(i, 1 );
            for (var i=0;i<arr.length;i++)
                arr[i].day = d;            
			var c = "d"+me.duration;
			if (arr.length==0)
			{   
			    me.invalidDatesByDuration[c] = me.invalidDatesByDuration[c] || [];
			    if ($.inArray(d, me.invalidDatesByDuration[c]) == -1)
			        me.invalidDatesByDuration[c][me.invalidDatesByDuration[c].length] = d;
			} 
			return arr;		  
			  		       
        },
		getAvailableSlots: function(d)
		{      
		    var me = this;
		    function setHtmlUsedSlots(d,st,et)
		    {
		        st = st * 60;
		        et = et * 60;
		        var htmlSlots = new Array();
		    	if (me.bSlotsCheckbox && me.usedSlotsCheckbox)
		    	{
		    	    //for (var i=0;i<me.cacheArr[d].length;i++)
		    	    //    if (st<=me.cacheArr[d][i].h1*60+m1 && et>=me.cacheArr[d][i].h2*60+m2) 
		    	    //        htmlSlots[htmlSlots.length] = jQuery.extend({}, me.cacheArr[d][i]);
		    	    for (var i=0;me.usedSlots[d] && i<me.usedSlots[d].length;i++) 
		    	    {
		    	        if (st<=me.usedSlots[d][i].h1*60+me.usedSlots[d][i].m1 && et>=me.usedSlots[d][i].h2*60+me.usedSlots[d][i].m2)
		    	            htmlSlots[htmlSlots.length] = jQuery.extend({}, me.usedSlots[d][i]);
		    	    }
		    	}
		    	return htmlSlots;		        
		    }
		    
		    var day = $.datepicker.parseDate("yy-mm-dd", d);
		    if (this.tz==0)
		    {
		        me.htmlUsedSlots[d] = setHtmlUsedSlots(d,0,24);
		        return this.getAvailablePartialSlots(d,[{h1:0,m1:0,h2:0,m2:0}]);
		    }    
		    else if (this.tz > 0)
		    {
		        day.setDate(day.getDate() - 1);
		        var d1 = $.datepicker.formatDate("yy-mm-dd",day);
		        var arr = $.merge(this.getAvailablePartialSlots(d1,[{h1:0,m1:0,h2:24-this.tz,m2:0}]),this.getAvailablePartialSlots(d,[{h1:24-this.tz,m1:0,h2:24,m2:0}]));
		    	me.htmlUsedSlots[d] = $.merge(setHtmlUsedSlots(d1,24-this.tz,24), setHtmlUsedSlots(d,0,24-this.tz));
		        //if (arr.length>0)
		        //    console.log(d1+"="+(24-this.tz)+":24 "+d+"=0:"+(24-this.tz));
		        return arr;
		    }  
		    else
		    {
		        day.setDate(day.getDate() + 1);
		        var d1 = $.datepicker.formatDate("yy-mm-dd",day);
		        var arr = $.merge(this.getAvailablePartialSlots(d,[{h1:0,m1:0,h2:this.tz*-1,m2:0}]),this.getAvailablePartialSlots(d1,[{h1:this.tz*-1,m1:0,h2:24,m2:0}]));
		        me.htmlUsedSlots[d] = $.merge(setHtmlUsedSlots(d1,this.tz*-1,24), setHtmlUsedSlots(d,0,this.tz*-1));
		        //if (arr.length>0)
		        //    console.log(d1+"="+(this.tz*-1)+":24 "+d+"=0:"+(this.tz*-1));
		        return arr;		        
		    }
		},		
		after_show:function()
		{
		    if (typeof cp_hourbk_timezone !== 'undefined') 
		    {
		        var gmt = (parseInt(cp_hourbk_timezone));
		        var local = (new Date().getTimezoneOffset()  * -1)/60;			 
                this.tz = local - gmt;
		    }
		    
		    function onChangeDateOrService(d)
		    {
		        function formattime(t,mt)//mt=2 for database 09:00
		  		{
		  		    t = t % (24*60);
		  		    var h = Math.floor(t/60);
		  			var m = t%60;
		  			var suffix = "";
		  			if (mt==0)
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
		  			return (((h<10)?((mt==2)?"0":""):"")+h+":"+(m<10?"0":"")+m)+suffix;									
		  		}
		  		function loadSlots(d)
		  		{
		  		    me.duration = $(".fieldCalendarService"+me.name+" select option:selected").val()*1;
		  		    var bduration = me.duration;
		  		    if (!me.bSlotsCheckbox)
		  		        bduration = me.bSlots*1;
		  		    me.bduration = bduration;
		  		    if (me.formId == 0)
		  		    {  	
		  		        me.formId = $(".fieldCalendarService"+me.name).parents("form").find('input[type="hidden"][name$="_id"]').val();
		  			    $.ajax(
		  		        {
		  		    	    dataType : 'json',
		  		    	    type: "POST",
		  		    	    url : document.location.href,
		  		    	    cache : true,
		  		    	    data :  { cp_app_action: 'get_slots',
		  		    		    formid: me.formId,
		  		    		    formfield: me.name.replace(me.form_identifier, "")   
		  		    		},
		  		    	    success : function( data ){
		  		    	        for (var i=0;i<data.length;i++)
		  		    	        {
		  		    	            var dd = data[i].d;
		  		    	            me.cacheArr[dd] = me.cacheArr[dd] || [];
		  		    	            me.cacheArr[dd][me.cacheArr[dd].length] = data[i];	
		  		    	        }
		  		    		    me.cacheArr[d] = me.cacheArr[d] || [];
		  		    		    getSlots(d);					      			
		  		    	    }
		  		        });	
		  		    }
		  		    else
		  		    {	
		  		        me.cacheArr[d] = me.cacheArr[d] || [];
		  		        getSlots(d);
		  		    }    
		  		}
		  		function getSlots(d)
		  		{ 	
		  		    function formatString(obj,showdate,tz)
		  		    {
		  		        tz = tz * 60;
		  		        if (!obj.st)
		  		            obj.st = obj.h1*60+obj.m1*1;
		  		        if (!obj.et)
		  		            obj.et = obj.h2*60+obj.m2*1;    
		  		        var str = "";
		  		        if (showdate)
		  		            str += $.datepicker.formatDate(me.dateFormat, $.datepicker.parseDate("yy-mm-dd", d))+" ";
		  		        str += formattime(obj.st+tz,me.militaryTime)+(me.showEndTime?("-"+formattime(obj.et+tz,me.militaryTime)):"");    
		  		        return str;      
		  		    }		
		            var data1 = me.cacheArr[d];
		  			var duration = me.duration;
		  			var bduration = me.bduration;			     
		  			var str = "";				
		  			var arr = me.getAvailableSlots(d);
		  			var nextdateAvailable = $.datepicker.parseDate("yy-mm-dd", d);
		  			var c = "d"+me.duration;
		  			var s = $( '#field' + me.form_identifier + '-' + me.index + ' .slotsCalendar'+me.name );
		  			if ((me.maxNumberOfApp==0 || me.allUsedSlots.length<me.maxNumberOfApp) && arr.length==0 )
		    		{
                        while (!DisableSpecificDates(nextdateAvailable) || (arr.length==0 && me.invalidDatesByDuration[c].length<100))
                        {
                            nextdateAvailable.setDate(nextdateAvailable.getDate() + 1);
                            arr = me.getAvailableSlots($.datepicker.formatDate("yy-mm-dd",nextdateAvailable));
                        }  
                        if (arr.length>0)  
                        {
                            e.datepicker("setDate", nextdateAvailable);
                            me.getD = nextdateAvailable;
		                    onChangeDateOrService($.datepicker.formatDate("yy-mm-dd", nextdateAvailable));  
                        } 
                        else if (me.invalidDatesByDuration[c].length>=100)
                        {
                            e.datepicker("setDate", me.startdate);
                            s.html("<div class=\"slots\">No more slots available.</div>");                           
                        }
                        return;
		    		}
		    		var htmlSlots = new Array();
		    		if (me.bSlotsCheckbox && me.usedSlotsCheckbox)
		    		{
		    		    htmlSlots = me.htmlUsedSlots[d].slice(0);		    		                
		    	        for (var i=0;i<htmlSlots.length;i++)
		    	        { 
		    	            htmlSlots[i].st = htmlSlots[i].h1 * 60 + htmlSlots[i].m1;
		    	            htmlSlots[i].t = $.datepicker.parseDate("yy-mm-dd",htmlSlots[i].d).getTime()+htmlSlots[i].st*60*1000;
		    	            htmlSlots[i].html = '<div class="htmlUsed"><a>'+formatString(htmlSlots[i],false,me.tz)+'</a></div>';
		    	        }
		    		}    
		    		var html = "";
		    		var current = new Date();
		    		var currenttime = current.getTime()-me.tz*60*60*1000;
		  			for (var i=0;i<arr.length;i++)
		  			{
		  			  	st = arr[i].h1 * 60+arr[i].m1*1;
		  			  	et = arr[i].h2 * 60+arr[i].m2*1;
		  			  	if (st >= et)
		  			        et += 24 * 60;  
		  			  	while (st+duration<=et  && st<24 * 60)
		  			  	{ 
		  			  	    if ($.datepicker.parseDate("yy-mm-dd",arr[i].day).getTime()+st*60*1000 >= currenttime)
		  			  	    {
		  			  	        html = "<div><a href=\"\" d=\""+arr[i].day+"\" h1=\""+Math.floor((st)/60)+"\" m1=\""+((st)%60)+"\" h2=\""+Math.floor((st+duration)/60)+"\" m2=\""+((st+duration)%60)+"\">"+formatString({st:st,et:st+duration},false,me.tz)+"</a></div>";
		  			  	        htmlSlots[htmlSlots.length] = {st:st,html:html,t:$.datepicker.parseDate("yy-mm-dd",arr[i].day).getTime()+st*60*1000};
		  			  	    }
		  			  	    st += bduration;
		  			  	}
		  			}
		  			htmlSlots.sort(function(a, b){return a.t - b.t});////removehere
		  			for (var i=0;i<htmlSlots.length;i++)
		  			{
		  			    str += htmlSlots[i].html;          
		  			}
		  			var before = "";
		  			if (s.find(".slots").length>0)
		  			{
		  			    before = s.find(".slots").attr("d");
		  			}  
		  			s.html("<div class=\"slots\" d=\""+d+"\"><span>"+$.datepicker.formatDate(me.dateFormat, $.datepicker.parseDate("yy-mm-dd", d))+"</span><br />"+str+"</div>");
		  			if (before!="" && before!=d)
		  			{
		  			    s.find(".slots span:first").hide().show(200);
		  			}
		  			var str1="",str2="";
		  			me.allUsedSlots = me.allUsedSlots || [];
		  			me.allUsedSlots.sort(function(a, b){ return ($.datepicker.parseDate("yy-mm-dd", a.d).getTime()+(a.h1*60+a.m1)*60*1000) - ($.datepicker.parseDate("yy-mm-dd", b.d).getTime()+(b.h1*60+b.m1)*60*1000)});
		  			j = 0;
		  			var total = 0;
		  			for (var i=0;i<me.allUsedSlots.length;i++)
		  			{
		  			    total += me.allUsedSlots[i].price;		  			    
		  			    str1 += "<div class=\"ahb_list\" d=\""+me.allUsedSlots[i].d+"\" h1=\""+me.allUsedSlots[i].h1+"\" m1=\""+me.allUsedSlots[i].m1+"\" h2=\""+me.allUsedSlots[i].h2+"\" m2=\""+me.allUsedSlots[i].m2+"\" ><span class=\"ahb_list_time\">"+formatString(me.allUsedSlots[i],true,me.tz)+"</span><span class=\"ahb_list_service\">"+me.services[me.allUsedSlots[i].serviceindex].name+"</span><a href=\"\" d=\""+d+"\" i=\""+j+"\" iall=\""+i+"\">["+(cp_hourbk_cancel_label?cp_hourbk_cancel_label:'cancel')+"]</a></div>";
		  			    str2 += ((str2=="")?"":";")+me.allUsedSlots[i].d+" "+formattime(me.allUsedSlots[i].h1*60+me.allUsedSlots[i].m1*1,2)+"/"+formattime(me.allUsedSlots[i].h2*60+me.allUsedSlots[i].m2*1,2)+" "+me.allUsedSlots[i].serviceindex;
		  			    if (me.allUsedSlots[i].d==d)
		  			      j++;
		  			}
		  			if (me.showTotalCost && (str1!=""))
		  			    str1 += '<div class="totalCost"><span>'+cp_hourbk_cost_label+'</span><span class="n"> '+me.showTotalCostFormat.replace("{0}", total)+'</span></div>';
		  			$( '#field' + me.form_identifier + '-' + me.index + ' .usedSlots'+me.name ).html(str1);	
		  			$( '#field' + me.form_identifier + '-' + me.index + ' #'+me.name ).val(str2);
		  		    $( '#field' + me.form_identifier + '-' + me.index + ' #'+me.name ).change();
		  			$( '#field' + me.form_identifier + '-' + me.index + ' #tcost'+me.name ).val(total); 		  			
		  			$( '#field' + me.form_identifier + '-' + me.index + ' .slots a').off("click").on("click", function() 
		  			{
		  			    if ($(this).parents("fieldset").hasClass("ahbgutenberg_editor"))
		  			        return false;	
		  			    if ($(this).parent().hasClass("htmlUsed"))
		  			        return false;
		  				me.allUsedSlots = me.allUsedSlots || [];
		  				if (me.maxNumberOfApp==0 || me.allUsedSlots.length<me.maxNumberOfApp)
		  				{	
		  				    var d = $(this).attr("d");
		  				    me.usedSlots[d] = me.usedSlots[d] || [];	  				    
		  				    obj = {h1:$(this).attr("h1")*1,m1:$(this).attr("m1")*1,h2:$(this).attr("h2")*1,m2:$(this).attr("m2")*1,d:d,serviceindex:$(".fieldCalendarService"+me.name+" select option:selected").index(),price:parseFloat(me.services[$(".fieldCalendarService"+me.name+" select option:selected").index()].price)};	            	
		  				    me.usedSlots[d][me.usedSlots[d].length] = obj; 
		  				    me.allUsedSlots[me.allUsedSlots.length] = obj;
		  				    onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', me.getD));
		  			    }
		  			    else
		  			        alert($.validator.messages.maxapp.replace("{0}",me.maxNumberOfApp));
		  				return false;
		  			});		  			
		  			$( '#field' + me.form_identifier + '-' + me.index + ' .usedSlots'+me.name+ ' a').off("click").on("click", function() 
		  			{
		  			    var d = $(this).parents(".ahb_list").attr("d");
		  				var h1 = $(this).parents(".ahb_list").attr("h1");
		  				var m1 = $(this).parents(".ahb_list").attr("m1");
		  				var h2 = $(this).parents(".ahb_list").attr("h2");
		  				var m2 = $(this).parents(".ahb_list").attr("m2");
		  				me.usedSlots[d] = me.usedSlots[d] || [];
		  				var find = false;
		  		        for (var i = 0; (i<me.usedSlots[d].length && !find); i++)
		  		            if (me.usedSlots[d][i].d==d && me.usedSlots[d][i].h1==h1 && me.usedSlots[d][i].m1==m1 && me.usedSlots[d][i].h2==h2 && me.usedSlots[d][i].m2==m2)
		  		            {
		  		                find = true;
		  		                me.usedSlots[d].splice(i, 1);    
		  		            }	
		  		        var find = false;
		  		        for (var i = 0; (i<me.allUsedSlots.length && !find); i++)
		  		            if (me.allUsedSlots[i].d==d && me.allUsedSlots[i].h1==h1 && me.allUsedSlots[i].m1==m1 && me.allUsedSlots[i].h2==h2 && me.allUsedSlots[i].m2==m2)
		  		            {
		  		                find = true;
		  		                me.allUsedSlots.splice(i, 1);    
		  		            }
		  			    var c = "d"+me.duration;
		  			    if ($.inArray(d, me.invalidDatesByDuration[c]) > -1)
		  			    {
		  			        me.invalidDatesByDuration[c].splice($.inArray(d, me.invalidDatesByDuration[c]), 1);
		  			        e.datepicker("setDate", me.getD);
		  			    }
		  			    onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', me.getD));
		  			    return false;
		  			});
		  		}		  					
		  		loadSlots(d);	  
		  					
		    }
		  	var me  = this,
		  	e   = $( '#field' + me.form_identifier + '-' + me.index + ' .fieldCalendar'+me.name ),
		  	d   = $( '#field' + me.form_identifier + '-' + me.index + ' .fieldCalendarService'+me.name ),
		  	str = "",
		  	op = "";
		  	this.invalidDates = this.invalidDates.replace( /\s+/g, '' );
		  	if( !/^\s*$/.test( this.invalidDates ) )
		  	{
		  	    var dateRegExp = new RegExp( /^\d{1,2}\/\d{1,2}\/\d{4}$/ ), counter = 0, dates = this.invalidDates.split( ',' );
		  	    this.invalidDates = [];
		  	    for( var i = 0, h = dates.length; i < h; i++ )
		  	    {
		  	        var range = dates[ i ].split( '-' );                    
		  	        if( range.length == 2 && range[0].match( dateRegExp ) != null && range[1].match( dateRegExp ) != null )
		  	        {
		  	            var fromD = new Date( range[ 0 ] ),
		  	                toD = new Date( range[ 1 ] );
		  	            while( fromD <= toD )
		  	            {
		  	            	this.invalidDates[ counter ] = fromD;
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
		  	                    this.invalidDates[ counter ] = new Date( range[ j ] );
		  	                    counter++;
		  	                }
		  	            }
		  	        }
		  	    }
		  	}
		  	if ($.validator.messages.date_format && $.validator.messages.date_format!="")	
		  	    me.dateFormat = $.validator.messages.date_format;
		  	for (var i=0;i<me.services.length;i++)
		  	    str += '<option value="'+me.services[i].duration+'">'+me.services[i].name+'</option>';
		  	d.html('<select>'+str+'</select>');
		  	$(".fieldCalendarService"+me.name+" select").bind("change", function() 
		  	{
		  		 onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', me.getD));
		  	});
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
		  			me.getD = e.datepicker("getDate");
		  			onChangeDateOrService($.datepicker.formatDate("yy-mm-dd", me.getD));
		  			
           	    },
		  		beforeShowDay: function (d) {
		  		    var day = $.datepicker.formatDate('yy-mm-dd', d);
                    var c =  new Array(day);
                    if (me.working_dates[d.getDay()]==0)
                        c.push("nonworking  ui-datepicker-unselectable ui-state-disabled");
                    for( var i = 0, l = me.invalidDates.length; i < l; i++ )
                    {
                    	if (d.getTime() === me.invalidDates[i].getTime())
                    	    c.push("nonworking  ui-datepicker-unselectable ui-state-disabled invalidDate");
                    }
                    me.getAvailableSlots(day);
                    if ($.inArray(day, me.invalidDatesByDuration["d"+me.duration]) > -1)
                        c.push("nonworking  ui-datepicker-unselectable ui-state-disabled notavailslot");    
                    return [true,c.join(" ")];
		        }
		    });
		    e.datepicker("option", $.datepicker.regional[$.validator.messages.language]);
		    e.datepicker("option", "firstDay", me.firstDay );
		    e.datepicker("option", "dateFormat", me.dateFormat );
		    e.datepicker("option", "minDate", me.minDate );
		    e.datepicker("option", "maxDate", me.maxDate );		    
		    me.tmpinvalidDatestime = new Array();
            try {
                  for (var i=0;i<me.tmpinvalidDates.length;i++)
                      me.tmpinvalidDatestime[i]=me.invalidDates[i].getTime();              
            } catch (e) {}
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
               me.getD = nextdateAvailable;  
		           onChangeDateOrService($.datepicker.formatDate('yy-mm-dd', nextdateAvailable));
		    }
		    getExtras=function()
		    {
		        var f = $( '#field' + me.form_identifier + '-' + me.index ).parents( "form" );
		        var v = 0;
		        var e = f.find(".ahb_service").find(':checked:not(.ignore)');
		        if( e.length )
				{
					e.each( function(){
						v += this.value*1;
					});
				}
				e = f.find(".ahb_service_per_slot").find(':checked:not(.ignore)');
				me.allUsedSlots = me.allUsedSlots || [];
				var s = me.allUsedSlots.length;
		        if( e.length )
				{
					e.each( function(){
						v += this.value * s;
					} );
				}
				e = f.find(".ahb_service_per_quantity_selection").find(':checked:not(.ignore)');
				var q = f.find(".sbquantity1").val() * 1 + f.find(".sbquantity2").val() * 1;
		        if( e.length )
				{
					e.each( function(){
						v += this.value * q;
					} );
				}
				f.find('#'+me.name+'_services').val(v);
				me.extras = v;
				var total = $( '#field' + me.form_identifier + '-' + me.index + ' #tcost'+me.name ).val()*1+ v;
				$( '#field' + me.form_identifier + '-' + me.index ).find(".totalCost .n").html(" " +me.showTotalCostFormat.replace("{0}",total));
				$( '#field' + me.form_identifier + '-' + me.index + ' #'+me.name ).change();
		    }    
		    $( '#field' + me.form_identifier + '-' + me.index ).parents( "form" ).find(".ahb_service,.ahb_service_per_slot,.ahb_service_per_quantity_selection").on("click", function(){
		        getExtras();
		    }); 
		    $( '#field' + me.form_identifier + '-' + me.index ).parents( "form" ).submit(function(  ) {
		        getExtras();  
            });
		},  
		val:function()
		{   
		    return 0;
		}		    
	}         
);            
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              