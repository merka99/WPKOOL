=== Appointment Hour Booking - WordPress Booking Plugin ===
Contributors: codepeople
Donate link: https://apphourbooking.dwbooster.com/download
Tags: hour,calendar,service,booking,appointment,schedule,sessions,events,reservation,classes,teaching,training
Requires at least: 3.0.5
Tested up to: 5.0
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Appointment Hour Booking is a plugin for creating booking forms for appointments with a start time and a defined duration over a schedule.

== Description ==

Appointment Hour Booking is a WordPress plugin for creating booking forms for **appointments with a start time and a defined duration** over a schedule. The start time is visually selected by the end user from a set of start times calculated based in the **"open" hours and service duration**. The duration/schedule is defined in the "service" selected by the customer. Each calendar can have multiple services with different duration and prices.

This plugin is useful for different cases like **booking of medical services** where services with different duration and prices may be available, for **personal training sessions**, for **booking rooms for events**, for **reserving language classes** or other type of classes and other type of **services/resources booking** where start times are selected and the availability is automatically managed using the defined service duration to avoid double-booking (the booked time is blocked once the booking is completed).

Main Features:

* Easy **visual configuration** of calendar data and schedules
* **Working dates**, invalid/holiday dates and special dates can be defined
* Supports restriction of **default, maximum and minimimum dates**
* **Open hours** can be defined for each date
* Each calendar can have **multiple services** defined
* Each service can have its own **price and duration**
* **Start-times** are calculated automatically based in the open hours and service duration
* Available times are managed automatically to **avoid double-booking**
* Multiple services can be selected on each booking
* Automatic price calculation
* Customizable **email notifications** for administrators and users
* Form **validation** and built it anti-spam **captcha** protection
* Manual and automatic **CSV reports**
* iCal addon with iCal export link and iCal file attached into emails
* Calendar available in 53+ languages
* Multiple date formats supported
* Multi-page calendars
* Printable **appointments list**

Features in commercial versions:

* **Visual form builder** for creating the booking form fields
* Booking form can be connected to **payment process** (Ex: PayPal Standard, PayPal Pro, Stripe, Skrill, Authorize.net, TargetPay/iDEAL, Mollie/iDEAL, SagePay, Redsys)
* **Addons** for integration with external services: reCaptcha, MailChimp, SalesForce, WooCommerce and others
* **Addons** with additional features: appointment cancellation addon, appointment reminders addon, clickatell and twilio SMS add-ons, signature fields, iCal synchronization

= Appointment Hour Booking can be used for: = 

**Booking services or resources:** Define schedule, open hours, services, prices and durations and let the calendar plugin manage the schedule.

**Sample cases:** Medical services, personal training, resource allocation, booking rooms, classes, etc...


== Installation ==

To install **Appointment Hour Booking**, follow these steps:

1.	Download and unzip the Appointment Hour Booking calendar plugin
2.	Upload the entire appointment-hour-booking/ directory to the /wp-content/plugins/ directory
3.	Activate the Appointment Hour Booking plugin through the Plugins menu in WordPress
4.	Configure the settings at the administration menu >> Settings >> Appointment Hour Booking. 
5.	To insert the appointment hour booking calendar form into some content or post use the icon that will appear when editing contents

== Frequently Asked Questions ==

= Q: What means each field in the appointment hour booking calendar settings area? =

A: The product's page contains detailed information about each appointment calendar field and customization:

https://apphourbooking.dwbooster.com


= Q: Where can I publish a appointment booking form? =

A: You can publish appointment booking forms on pages and posts. The shortcode can be also placed into the template. The commercial versions of the plugin also allow publishing it as a widget.


= Q: How can I apply CSS styles to the form fields? =

A: Please check complete instructions in the following page: https://apphourbooking.dwbooster.com/faq#q82

= Q: How can I align the form using various columns? =

A: Into the form editor click a field and into its settings there is one field named "**Add Css Layout Keywords**". Into that field you can put the name of a CSS class that will be applied to the field.

There are some pre-defined CSS classes to use align two, three or four fields into the same line. The CSS classes are named:

**column2**
**column3**
**column4**

For example if you want to put two fields into the same line then specify for both fields the class name "**column2**".


= Q: How to hide the fields on forms? =

A: You should use a custom class name. All fields include the attribute "Add Css Layout Keywords", you only should enter through this attribute a custom class name (the class name you prefer), for example myclass, and then define the new class in a css file of your website, or add the needed styles into the "Customization area >> Add Custom Styles" (at the bottom of the page that contains the list of calendars):

.myclass{ display:none; }

If you are using the latest version of the plugin, please enter in the "Add Css Layout Keywords" attribute, the class name: hide, included in the plugin's distribution.

= Q: How to edit or remove the form title / header? =

A: Into the form builder in the administration area, click the "Form Settings" tab. That area is for editing the form title and header text.

It can be used also for different alignment of the field labels.


= Q: Can the emails be customized? =

A: In addition to the possibility of editing the email contents you can use the following tags:

%INFO%: Replaced with all the information posted from the form
%itemnumber%: Request ID.
%formid%: ID of the booking form.
%referrer%: Referrer URL if reported.
%additional%: IP address, server time.
%final_price%: Total cost.
%fieldname1%, %fieldname2%, ...: Data entered on each field

= Q: Can I add a reference to the item number (submission number) into the email? =

A: Use the tag %itemnumber% into the email content. That tag will be replaced by the submission item number.


= Q: How to insert an image in the notification emails? =

A: If you want send an image in the notification emails, like a header, you should insert an IMG tag in the "Email notification to admin" and/or "Email confirmation to user" textareas of form settings, with an absolute URL in the SRC attribute of IMG tag:

<IMG src="http://..." >

= Q: How to insert changes of lines in the notification emails, when the HTML format is selected? =

A: If you are using the HTML format in the notification emails, you should insert the BR tags for the changes of lines in the emails content:

<BR />


= Q: The form doesn't appear. Solution? =

A: If the form doesn't appear in the public website (in some cases only the captcha appear) then change the script load method to direct, this is the solution in most cases.

That can be changed in the "troubleshoot area" located below the list of calendars/items.

= Q: I'm not receiving the emails with the appointment data. =

A: Try first using a "from" email address that belongs to your website domain, this is the most common restriction applied in most hosting services.

If that doesn't work please check if your hosting service requires some specific configuration to send emails from PHP/WordPress websites. The plugin uses the settings specified into the WordPress website to deliver the emails, if your hosting has some specific requirements like a fixed "from" address or a custom "SMTP" server those settings must be configured into the WordPress website.


= Q: Non-latin characters aren't being displayed in the form. There is a workaround? =

A: Use the "throubleshoot area" to change the character encoding.


= Q: Can I display a list with the appointments? =

A: A list with the appointments set on the calendar can be displayed by using this shortcode in the page where you want to display the list:

**[CP_APP_HOUR_BOOKING_LIST]**

... it can be also customized with some parameters if needed, example:

**CP_APP_HOUR_BOOKING_LIST from="today" to="today +30 days" fields="DATE,TIME,email" calendar="1"]**

... the "from" and "to" are used to display only the appointments / bookings on the specified period. That can be either indicated as relative days to "today" or as fixed dates.

The styles for the list are located at the end of the file "css/stylepublic.css":

**.cpabc_field_0, .cpabc_field_1, .cpabc_field_2, ...**

Clear the browser cache if the list isn't displayed in a correct way (to be sure it loads the updated styles).

You can also add the needed styles into the "Customization area >> Add Custom Styles" (at the bottom of the page that contains the list of calendars):

= Q: Are the forms GDPR compliant? =

A: In all plugin versions you can turn off IP tracking to avoid saving that user info. Full GDPR compliant forms can be built using the commercial versions of the plugin.



== Other Notes ==

= The Troubleshoot Area =

Use the troubleshot if you are having problems with special or non-latin characters. In most cases changing the charset to UTF-8 through the option available for that in the troubleshot area will solve the problem.

You can also use this area to change the script load method if the booking calendar isn't appearing in the public website.

 
= The Notification Emails =

The notification emails with the appointment data entered in the booking form can sent in "Plain Text" format (default) or in "HTML" format. If you select "HTML" format, be sure to use the BR or P tags for the line breaks into the text and to use the proper formatting.

 
= Exporting Appointments to CSV / Excel Files =  

The appointment data can be exported to a CSV file (Excel compatible) to manage the data from other applications. That option is available from the "bookings list", the appointments can be filtered by date and by the text into them, so you can export just the needed appointments to the CSV file.
 

= Other Versions and Features = 
 
The free version published in this WordPress directory is a fully-functional version for accepting appointments as indicated in the plugin description. There are also commercial versions with additional features, for example:

- Ability to process forms/appointments linked to payment process (PayPal, Skrill)
- Form builder for a visual customization of the booking form
- Addons with multiple additional features

Please note that the pro features aren't advised as part of the free plugin in the description shown in this WordPress directory. If you are interested in more information about the commercial features go to the plugin's page: https://apphourbooking.dwbooster.com/download
 
 
== Screenshots ==

1. Appointment booking form.
2. Inserting an appointment hour booking calendar into a page.
3. Managing the appointment hour booking  calendar.
4. Appointment Hour Booking calendar settings.
5. Integration with the new Gutemberg Editor

== Changelog ==

= 1.0.02 =
* First version published

= 1.0.03 =
* Bug fixes (notices with WP_DEBUG enabled) 

= 1.0.04 =
* Fixed bug when adding new form

= 1.0.05 =
* New banners and icons

= 1.0.06 =
* Fixed bug in insert query

= 1.0.07 =
* Added CSS and JavaScript customization panel

= 1.0.08 =
* New iCal export option
* New iCal attachment for emails option
* Supports multi-page (multi-month) calendars/items
* Support for multiple languages
* Support for multiple date formats
* Feature for limiting the number of appointments allowed on a single booking action
* Bugs corrections and fixes

= 1.0.09 =
* Fixed bug in availability management

= 1.0.10 =
* Docs and interface updates

= 1.0.11 =
* Improved interface and descrciption

= 1.0.12 =
* Fixed problem with the invalid dates in the public site

= 1.0.14 =
* Fixed problem with the invalid dates in the dashboard area

= 1.0.15 =
* Fixed admin menu links and website services

= 1.0.16 =
* Fixed bug in invalid dates feature

= 1.0.17 =
* Fix in description, tags and author links

= 1.0.18 =
* Fixed help texts in admin interface

= 1.0.19 =
* New improved admin interface

= 1.0.20 =
* New support and documentation options

= 1.0.21 =
* Fixed bug in visual form builder

= 1.0.22 =
* Fixed bug with more than one form in the booking form

= 1.0.23 =
* New feature for indepedent time-slot intervals

= 1.0.24 =
* Improved CSS customization section

= 1.0.25 =
* Fixed conflict with autoptimize plugin

= 1.0.26 =
* Fixed bug in form builder

= 1.0.27 =
* Fixed captcha reloading issue

= 1.0.28 =
* Fixed bug in date restrictions

= 1.0.29 =
* Increased max app length

= 1.0.30 =
* Bug fixes on iCal attachments

= 1.0.31 =
* Added GDPR acceptance field in the form builder

= 1.0.32 =
* Code memory and speed optimizations

= 1.0.33 =
* Updates to support links, documentation and scheduling

= 1.0.34 =
* Easier activation process

= 1.0.35 =
* Optional deactivation feedback

= 1.0.36 =
* Fixed bug in activation process

= 1.0.37 =
* Database creating encoding fix 

= 1.0.38 =
* Improved default format of submitted data

= 1.0.39 =
* Added service name to selection

= 1.0.40 =
* Fixed issue in activation process

= 1.0.41 =
* Avoided conflict with bootstrap datepicker implementations

= 1.0.42 =
* Compatible with Gutenberg

= 1.0.43 =
* New support and demo links

= 1.0.44 =
* Fix to Gutenberg integration

= 1.0.45 =
* Conflict avoided with Gutenberg editor

= 1.0.46 =
* Added installation wizard
* Calendar availability edition fixed
* iCal export format correction

= 1.0.47 =
* Fixed magic quotes issue

= 1.0.48 =
* Major update. Full redesign and improvements.

= 1.0.49 =
* Text field added to the form builder

= 1.0.50 =
* Improved CSS customization settings

= 1.0.51 =
* Blink effect to submit button

= 1.0.52 =
* Fixed bug in current date availability

= 1.0.53 =
* Added end-time display. Thank you to @andreastypo for the feedback and code.

= 1.0.54 =
* Improved availability verification

= 1.0.55 =
* Fixed conflict with third party plugins

= 1.0.56 =
* Added plugin translations

= 1.0.57 =
* Gutenberg compatibility updates

= 1.0.58 =
* Fix to plugin translations

= 1.0.59 =
* iCal export improvements

= 1.0.60 =
* AM/PM calendar fix and form builder fixes

= 1.0.61 =
* Fixed visualization issue in calendars list

= 1.0.62 =
* New features in available slots rendering

= 1.0.63 =
* Fixed display issue in form builder

= 1.0.64 =
* Feature for adding bookings from admin

= 1.0.65 =
* Fix to character encoding in CSV exports. New feature for showing booked slots.

= 1.0.66 =
* Set order to selected times

= 1.0.67 =
* Fixed bug in time calculation

= 1.0.68 =
* New Gutemberg Block

= 1.0.69 =
* Redirect / confirmation page supports now booking parameters

= 1.0.70 =
* Fixed bug in form edition

= 1.0.72 =
* Better CSS customization options

= 1.0.73 =
* Fixed submission processing bugs

= 1.0.74 =
* Clone calendar feature

= 1.0.75 =
* Removed use of CURL

= 1.0.76 =
* Better date format management

= 1.0.77 =
* Timezone conversion updates

== Upgrade Notice ==

= 1.0.77 =
* Timezone conversion updates