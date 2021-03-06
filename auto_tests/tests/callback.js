/** 
 * @fileoverview Test cases for the callbacks.
 *
 * @author uemit.seren@gmail.com (Ümit Seren)
 */

var CallbackTestCase = TestCase("callback");

CallbackTestCase.prototype.setUp = function() {
  document.body.innerHTML = "<div id='graph'></div>";
};

CallbackTestCase.prototype.tearDown = function() {
};
 
 var data = "X,a\,b,c\n" +
 "10,-1,1,2\n" +
 "11,0,3,1\n" +
 "12,1,4,2\n" +
 "13,0,2,3\n";
 
 
 /**
  * This tests that when the function idxToRow_ returns the proper row and the onHiglightCallback
  * is properly called when the  first series is hidden (setVisibility = false) 
  * 
  */
 CallbackTestCase.prototype.testHighlightCallbackIsCalled = function() {
   var h_row;
   var h_pts;

   var highlightCallback  =  function(e, x, pts, row) {
   	  h_row = row;
   	  h_pts = pts;
   }; 

   

   var graph = document.getElementById("graph");
   var g = new Dygraph(graph, data,
       {
         width: 100,
         height : 100,
         visibility: [false, true, true],
         highlightCallback : highlightCallback,
       });

   DygraphOps.dispatchMouseMove(g, 13, 10);

   //check correct row is returned
   assertEquals(3, h_row);
   //check there are only two points (because first series is hidden)
   assertEquals(2, h_pts.length);
 };
