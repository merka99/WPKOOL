<?php


$this->item = intval($_GET["cal"]);

$current_user = wp_get_current_user();
$current_user_access = current_user_can('edit_pages');

if ( !is_admin() || (!$current_user_access && !@in_array($current_user->ID, unserialize($this->get_option("cp_user_access","")))))
{
    echo 'Direct access not allowed.';
    exit;
}

if ($this->item != 0)
    $myform = $wpdb->get_results( $wpdb->prepare('SELECT * FROM '.$wpdb->prefix.$this->table_items .' WHERE id=%d' ,$this->item) );

$default_from = date("Y-m-d",strtotime("today -10 days"));
$default_to = date("Y-m-d",strtotime("today +30 days"));
$dfrom = (@$_GET["dfrom"] ? date("Y-m-d", strtotime(@$_GET["dfrom"])) : $default_from);
$dto = (@$_GET["dto"] ? date("Y-m-d", strtotime(@$_GET["dto"])) : $default_to);

?>


<h1><?php _e('Schedule','cpappb'); ?> - <?php if ($this->item != 0) echo $myform[0]->form_name; else echo 'All forms'; ?></h1>

<div class="ahb-buttons-container">
	<a href="<?php print esc_attr(admin_url('admin.php?page='.$this->menu_parameter));?>" class="ahb-return-link">&larr;Return to the calendars list</a>
	<div class="clear"></div>
</div>

<div class="ahb-section-container">
	<div class="ahb-section">
      <form action="admin.php" method="get">
        <input type="hidden" name="page" value="<?php echo $this->menu_parameter; ?>" />
        <input type="hidden" name="cal" value="<?php echo $this->item; ?>" />
        <input type="hidden" name="schedule" value="1" />
		<nobr><label>From:</label> <input type="text" id="dfrom" name="dfrom" value="<?php echo esc_attr(@$_GET["dfrom"]); ?>" >&nbsp;&nbsp;</nobr>
		<nobr><label>To:</label> <input type="text" id="dto" name="dto" value="<?php echo esc_attr(@$_GET["dto"]); ?>" >&nbsp;&nbsp;</nobr>
        <nobr>Paid Status: <select id="paid" name="paid">
         <option value="">All</option>
         <option value="1" <?php if (@$_GET["paid"]) echo ' selected'; ?>>Paid only</option>
      </select></nobr>
        <nobr>Booking Status: <?php $this->render_status_box('status', (!isset($_GET["status"])?'-1':$_GET["status"]), true); ?></nobr>
		<nobr><label>Item:</label> <select id="cal" name="cal">
          <option value="0">[All Items]</option>
   <?php
    $myrows = $wpdb->get_results( "SELECT * FROM ".$wpdb->prefix.$this->table_items );                                                                     
    foreach ($myrows as $item)  
         echo '<option value="'.$item->id.'"'.(intval($item->id)==intval($this->item)?" selected":"").'>'.$item->form_name.'</option>'; 
   ?>
    </select></nobr>
		<nobr>
			<input type="submit" name="<?php echo $this->prefix; ?>_csv" value="<?php _e('Export to CSV','cpappb'); ?>" class="button" style="float:right;margin-left:10px;">
			<input type="submit" name="ds" value="<?php _e('Filter','cpappb'); ?>" class="button-primary button" style="float:right;">
		</nobr>
      </form>
	</div>
</div>


<br />                            

<div id="dex_printable_contents">

 <div class="cpapp_no_wrap">
  <div class="cpappb_field_0 cpappb_field_header">Date</div>
  <div class="cpappb_field_1 cpappb_field_header">Slot</div>
  <div class="cpappb_field_2 cpappb_field_header">Service</div>
  <div class="cpappb_field_3 cpappb_field_header">Paid</div>
  <div class="cpappb_field_4 cpappb_field_header">Email</div>
  <div class="cpappb_field_5 cpappb_field_header">Data</div>
  <div class="cpappb_field_6 cpappb_field_header">Status</div>
  <div class="cpapp_break"></div>
 </div> 
 <div class="cpapp_break"></div>
<?php

echo $this->filter_list( array(
                               'calendar' => ($this->item != 0 ? $this->item : ''),
                               'fields' => 'DATE,TIME,SERVICE,paid,email,data,cancelled',
	    	                   'from' => $dfrom,
	    	                   'to' => $dto,
                               'paidonly' => @$_GET["paid"],
                               'status' => (!isset($_GET["status"])?'-1':$_GET["status"])
                               ) );

?>
</div>


<div class="ahb-buttons-container">
    <input type="button" value="<?php _e('Print','cpappb'); ?>" class="button button-primary" onclick="do_dexapp_print();" />
	<a href="<?php print esc_attr(admin_url('admin.php?page='.$this->menu_parameter));?>" class="ahb-return-link">&larr;Return to the calendars list</a>
	<div class="clear"></div>
</div>




<script type="text/javascript">
 function do_dexapp_print()
 {
      w=window.open();
      w.document.write("<style>.cpappb_field_header {font-weight: bold;background-color: #dcdcdc;}.cpapp_break { clear: both; }.cpappb_field_0, .cpappb_field_1,.cpappb_field_2, .cpappb_field_3,.cpappb_field_4, .cpappb_field_5,.cpappb_field_6, .cpappb_field_7,.cpappb_field_7, .cpappb_field_9,.cpappb_field_10, .cpappb_field_11{float: left; min-width: 85px;padding-right:11px;border-bottom: 1px dotted #777777;margin-left: 1px;     padding: 5px;margin: 2px;}.cpappb_field_0 {color: #44aa44;font-weight: bold; }.cpappb_field_1 {color: #aaaa44;font-weight: bold; }.cpappb_field_2{width:200px;}.cpappb_field_4{width:200px;}.cpappb_field_5{display:none;}.cpnopr{display:none;};table{border:2px solid black;width:100%;}th{border-bottom:2px solid black;text-align:left}td{padding-left:10px;border-bottom:1px solid black;}</style>"+document.getElementById('dex_printable_contents').innerHTML);
      w.print();
      w.close();    
 }
 
 var $j = jQuery.noConflict();
 $j(function() {
 	$j("#dfrom").datepicker({     	                
                    dateFormat: 'yy-mm-dd'
                 });
 	$j("#dto").datepicker({     	                
                    dateFormat: 'yy-mm-dd'
                 });
 });
 
</script>














