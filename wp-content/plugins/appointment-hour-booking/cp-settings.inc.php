<?php

if ( !is_admin() ) 
{
    echo 'Direct access not allowed.';
    exit;
}

$cpid = 'CP_AHB';

$gotab = '';
if (isset($_POST["gotab"]))
{
    $gotab = $_POST["gotab"];
    if ($gotab == '')
        $message = 'Email report settings updated.';
    else if ($gotab == 'fixarea')
        $message = 'Troubleshoot settings updated.';
    else if ($gotab == 'css')
        $message = 'Custom CSS updated.';
    else if ($gotab == 'js')
        $message = 'Custom javascript updated.';
} 
else 
    if (isset($_GET["gotab"]))
        $gotab = $_GET["gotab"];
    

?>
<style>
.ahb-tab{display:none;}
.ahb-tab label{font-weight:600;}
.tab-active{display:block;}
.ahb-code-editor-container{border:1px solid #DDDDDD;margin-bottom:20px;}
  
.ahb-csssample { margin-top: 15px; margin-left:20px;  margin-right:20px;}
.ahb-csssampleheader { 
  font-weight: bold; 
  background: #dddddd;
	padding:10px 20px;-webkit-box-shadow: 0px 2px 2px 0px rgba(100, 100, 100, 0.1);-moz-box-shadow:    0px 2px 2px 0px rgba(100, 100, 100, 0.1);box-shadow:         0px 2px 2px 0px rgba(100, 100, 100, 0.1);
}
.ahb-csssamplecode {     background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word; 
}   
</style>
<script>
// Move to an external file
jQuery(function(){
	var $ = jQuery,
		flag_css_editor = true,
		flag_js_editor = true;
    <?php 
          if ($gotab == 'css' || $gotab == 'js') 
          { 
			if(function_exists('wp_enqueue_code_editor'))
			{
				$settings_js = wp_enqueue_code_editor(array('type' => 'application/javascript'));
				$settings_css = wp_enqueue_code_editor(array('type' => 'text/css'));

				// Bail if user disabled CodeMirror.
				if(!(false === $settings_js && false === $settings_css))
				{
					if ($gotab == 'css') print sprintf('{flag_css_editor = false; wp.codeEditor.initialize( "ahb_styles_container", %s );}',wp_json_encode( $settings_css ));

					if ($gotab == 'js') print sprintf('{flag_js_editor = false; wp.codeEditor.initialize( "ahb_javascript_container", %s );}',wp_json_encode( $settings_js ));
				}
			}      
          }    
    ?>    
    
	$('.ahb-tab-wrapper .nav-tab').click(
		function(){
			$('.ahb-tab-wrapper .nav-tab.nav-tab-active').removeClass('nav-tab-active');
			$(this).addClass('nav-tab-active');

			var tab = $(this).data('tab');
			$('.ahb-tab.tab-active').removeClass('tab-active');
			$('.ahb-tab[data-tab="'+tab+'"]').addClass('tab-active');

			<?php
			// This function is used to load the code editor of WordPress
			if(function_exists('wp_enqueue_code_editor'))
			{
				$settings_js = wp_enqueue_code_editor(array('type' => 'application/javascript'));
				$settings_css = wp_enqueue_code_editor(array('type' => 'text/css'));

				// Bail if user disabled CodeMirror.
				if(!(false === $settings_js && false === $settings_css))
				{
					print sprintf('if(tab == 3 && flag_css_editor){flag_css_editor = false; wp.codeEditor.initialize( "ahb_styles_container", %s );}',wp_json_encode( $settings_css ));

					print sprintf('if(tab == 4 && flag_js_editor){flag_js_editor = false; wp.codeEditor.initialize( "ahb_javascript_container", %s );}',wp_json_encode( $settings_js ));
				}
			}
			?>
		}
	);
});
</script>
<h1>Appointment Hour Booking - General Settings</h1>

<?php
    if ($message) echo "<div id='setting-error-settings_updated' class='updated'><h2>".$message."</h2></div>";
?>
<nav class="nav-tab-wrapper ahb-tab-wrapper">
	<a href="javascript:void(0);" class="nav-tab<?php if ($gotab == '') echo ' nav-tab-active'; ?>" data-tab="1">Email Report Settings</a>
	<a href="javascript:void(0);" class="nav-tab<?php if ($gotab == 'fixarea') echo ' nav-tab-active'; ?>"  data-tab="2">Troubleshoot Area</a>
	<a href="javascript:void(0);" class="nav-tab<?php if ($gotab == 'css') echo ' nav-tab-active'; ?>"  data-tab="3">Edit Styles</a>
	<a href="javascript:void(0);" class="nav-tab<?php if ($gotab == 'js') echo ' nav-tab-active'; ?>"  data-tab="4">Edit Scripts</a>
</nav>

<!-- TAB 1 -->
<div class="ahb-tab<?php if ($gotab == '') echo ' tab-active'; ?>" data-tab="1">
	<h2>Automatic Email Reports</h2>
	<p>Automatic email reports for <b>ALL forms</b>: Send submissions in CSV format via email.</p>    
	<form name="updatereportsettings" action="" method="post">
     <input name="<?php echo $cpid; ?>_post_edition" type="hidden" value="1" />
     <input name="gotab" type="hidden" value="" />
     <table class="form-table">    
        <tr valign="top">
        <td scope="row" colspan="2"><strong><?php _e('Enable Reports?','cpappb'); ?></strong>
          <?php $option = get_option('cp_cpappb_rep_enable', 'no'); ?>
          <select name="cp_cpappb_rep_enable">
           <option value="no"<?php if ($option == 'no' || $option == '') echo ' selected'; ?>><?php _e('No','cpappb'); ?></option>
           <option value="yes"<?php if ($option == 'yes') echo ' selected'; ?>><?php _e('Yes','cpappb'); ?></option>
          </select>     
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <strong><?php _e('Send report every','cpappb'); ?>:</strong> <input type="text" name="cp_cpappb_rep_days" size="1" value="<?php echo esc_attr(get_option('cp_cpappb_rep_days', '1')); ?>" /> <?php _e('days','cpappb'); ?>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <strong><?php _e('Send after this hour (server time)','cpappb'); ?>:</strong>
          <select name="cp_cpappb_rep_hour">
           <?php
             $hour = get_option('cp_cpappb_rep_hour', '0');
             for ($k=0;$k<24;$k++)
                 echo '<option value="'.$k.'"'.($hour==$k?' selected':'').'>'.($k<10?'0':'').$k.'</option>';
           ?>
          </select>
        </td>
        <tr valign="top">
        <th scope="row"><?php _e('Send email from','cpappb'); ?></th>
        <td><input type="text" name="cp_cpappb_fp_from_email" size="70" value="<?php echo esc_attr(get_option('cp_cpappb_fp_from_email', get_the_author_meta('user_email', get_current_user_id()) )); ?>" /></td>
        </tr>       
        <tr valign="top">
        <th scope="row"><?php _e('Send to email(s)','cpappb'); ?></th>
        <td><input type="text" name="cp_cpappb_rep_emails" size="70" value="<?php echo esc_attr(get_option('cp_cpappb_rep_emails', '')); ?>" /></td>
        </tr>
        <tr valign="top">
        <th scope="row"><?php _e('Email subject','cpappb'); ?></th>
        <td><input type="text" name="cp_cpappb_rep_subject" size="70" value="<?php echo esc_attr(get_option('cp_cpappb_rep_subject', 'Submissions report...')); ?>" /></td>
        </tr>
        <tr valign="top">
        <th scope="row"><?php _e('Email format?','cpappb'); ?></th>
        <td>
          <?php $option = get_option('cp_cpappb_rep_emailformat', 'text'); ?>
          <select name="cp_cpappb_rep_emailformat">
           <option value="text"<?php if ($option != 'html') echo ' selected'; ?>><?php _e('Plain Text (default)','cpappb'); ?></option>
           <option value="html"<?php if ($option == 'html') echo ' selected'; ?>><?php _e('HTML (use html in the textarea below)','cpappb'); ?></option>
          </select>
        </td>
        </tr>  
        <tr valign="top">
        <th scope="row"><?php _e('Email Text (CSV file will be attached','cpappb'); ?>)</th>
        <td><textarea type="text" name="cp_cpappb_rep_message" rows="3" cols="80"><?php echo htmlspecialchars(get_option('cp_cpappb_rep_message', 'Attached you will find the data from the form submissions.')); ?></textarea></td>
        </tr>      
     </table>            
     <input type="submit" value="Update Report Settings" class="button button-primary" />
     </form>
     <div class="clear"></div>
     <p><?php _e('Note: For setting up a report only for a specific form use the setting area available for that when editing each form settings','cpappb'); ?>.</p>
	
</div>

<!-- TAB 2 -->
<div class="ahb-tab<?php if ($gotab == 'fixarea') echo ' tab-active'; ?>" data-tab="2">
	<h2>Troubleshoot Area</h2>
	<p><b>Important!:</b> Use this area only if you are experiencing conflicts with third party plugins, with the theme scripts or with the character encoding.</p>
    <form  method="post" action="" name="cpformconf2">
        <input name="<?php echo $cpid; ?>_post_edition" type="hidden" value="1" />
        <input name="gotab" type="hidden" value="fixarea" />
	    <table class="form-table">
            <tbody>
	    		<tr valign="top">
	    			<th scope="row">
	    				<label><?php _e('Script load method','cpappb'); ?></label>
	    			</th>
	    			<td>
	    				<select id="ccscriptload" name="ccscriptload">
        <option value="0" <?php if (get_option('CP_APPB_LOAD_SCRIPTS',"1") == "1") echo 'selected'; ?>><?php _e('Classic (Recommended)','cpappb'); ?></option>
        <option value="1" <?php if (get_option('CP_APPB_LOAD_SCRIPTS',"1") != "1") echo 'selected'; ?>><?php _e('Direct','cpappb'); ?></option>
       </select><br>
	    				<em><?php _e('Change the script load method if the form doesn\'t appear in the public website.','cpappb'); ?></em>
	    			</td>
	    		</tr>
	    		<tr valign="top">
	    			<th scope="row">
	    				<label><?php _e('Character encoding','cpappb'); ?></label>
	    			</th>
	    			<td>
	    				<select id="cccharsets" name="cccharsets">
	    					<option value=""><?php _e('Keep current charset (Recommended)','cpappb'); ?></option>
                            <option value="utf8_general_ci">UTF-8 (<?php _e('try this first','cpappb'); ?>)</option>
                            <option value="latin1_swedish_ci">latin1_swedish_ci</option>
	    				</select><br>
	    				<em><?php _e('Update the charset if you are getting problems displaying special/non-latin characters. After updated you need to edit the special characters again.','cpappb'); ?></em>
	    			</td>
	    		</tr>
	    	</tbody>
	    </table>
	    <input type="submit" value="Update Changes" class="button button-primary" />
    </form>    
</div>

<!-- TAB 3 -->
<div class="ahb-tab<?php if ($gotab == 'css') echo ' tab-active'; ?>" data-tab="3">
	<h2>Edit Styles</h2>
	<p>Use this area to add custom CSS styles. These styles will be keep safe even after updating the plugin.</p>
    <p>For commonly used CSS styles please check the following FAQ section: <a href="https://apphourbooking.dwbooster.com/faq#design">https://apphourbooking.dwbooster.com/faq#design</a></p>
    <form method="post" action="" name="cpformconf3"> 
         <input name="<?php echo $cpid; ?>_post_edition" type="hidden" value="1" />
         <input name="cfwpp_edit" type="hidden" value="css" />
         <input name="gotab" type="hidden" value="css" />  
	     <div class="ahb-code-editor-container">
    	    <textarea name="editionarea" id="ahb_styles_container" style="width:100%;min-height:500px;"><?php if (get_option($cpid.'_CSS', '')) echo base64_decode(get_option($cpid.'_CSS', '')); else echo '/* Styles definition here */'; ?></textarea>
	     </div>
	     <input type="submit" value="Save Styles" class="button button-primary" />
    </form>
   
   <br /><hr /><br />
   
   <div class="ahb-statssection-container" style="background:#f6f6f6;">
	<div class="ahb-statssection-header" style="background:white;
	padding:10px 20px;-webkit-box-shadow: 0px 2px 2px 0px rgba(100, 100, 100, 0.1);-moz-box-shadow:    0px 2px 2px 0px rgba(100, 100, 100, 0.1);box-shadow:         0px 2px 2px 0px rgba(100, 100, 100, 0.1);">
    <h3>Sample Styles:</h3>
	</div>
	<div class="ahb-statssection">
    

        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Make the calendar 100% width / responsive:
         </div>
         <div class="ahb-csssamplecode">
           #fbuilder .ui-datepicker-inline { max-width:none !important; }       
         </div>
        </div>
        
        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Make the send button in a hover format:
         </div>
         <div class="ahb-csssamplecode">
           .pbSubmit:hover {
               background-color: #4CAF50;
               color: white;
           }         
         </div>
        </div> 
        
        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Change the color of all form field labels:
         </div>
         <div class="ahb-csssamplecode">
           #fbuilder, #fbuilder label, #fbuilder span { color: #00f; }     
         </div>
        </div> 

        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Change color of fonts into all fields:
         </div>
         <div class="ahb-csssamplecode">
           #fbuilder input[type=text], 
           #fbuilder textarea, 
           #fbuilder select { 
             color: #00f; 
           }     
         </div>
        </div> 
        
        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Change the calendar header color:
         </div>
         <div class="ahb-csssamplecode">
           #fbuilder .ui-datepicker-header { background:#6cc72b ; color:#444; text-shadow:none; }
         </div>
        </div>  
        
        <div class="ahb-csssample">
         <div class="ahb-csssampleheader">
           Other styles:
         </div>
         <div class="ahb-csssamplecode">
           For other styles check the design section in the FAQ: <a href="https://apphourbooking.dwbooster.com/faq#design">https://apphourbooking.dwbooster.com/faq#design</a>     
         </div>
        </div>         
       
    </div>
   </div>    
    
</div>

<!-- TAB 4 -->
<div class="ahb-tab<?php if ($gotab == 'js') echo ' tab-active'; ?>" data-tab="4">
	<h2>Edit Scripts</h2>
	<p>Use this area to add custom custom scripts. These scripts will be keep safe even after updating the plugin.</p>
    <form method="post" action="" name="cpformconf4"> 
         <input name="<?php echo $cpid; ?>_post_edition" type="hidden" value="1" />
         <input name="cfwpp_edit" type="hidden" value="js" />   
         <input name="gotab" type="hidden" value="js" />          
	     <div class="ahb-code-editor-container">
		     <textarea name="editionarea" id="ahb_javascript_container" style="width:100%;min-height:500px;"><?php  if (get_option($cpid.'_JS', '')) echo base64_decode(get_option($cpid.'_JS', '')); else echo '// Javascript code here'; ?></textarea>
	     </div>
	     <input type="submit" value="Save Scripts" class="button button-primary" />
     </form>
</div>
