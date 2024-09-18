


jQuery(document).ready(function(){
    jQuery(function() {
          jQuery(this).bind("contextmenu", function(event) {
              event.preventDefault();
              alert('Stop trying to steal our code!')
          });
      });
  });

  let scriptElement = document.createElement("script");
scriptElement.type = "js";
scriptElement.src = "scripts.js";
document.body.appendChild(scriptElement);


  document.addEventListener('contextmenu', event => event.preventDefault());




document.onkeydown = function(e)
    {
        if(event.keyCode == 123)
        {
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0))
        {
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0))
        {
            return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))
        {
            return false;
        }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0))
    {
      return false;
    }
    }

  $(document).bind("contextmenu",function(e) {
    e.preventDefault();
});

$("#FooBar").click(function() {
    if (!this.acceptenceCriteria()) {
        return;
    }
    alert('Disabled: ' + $(this).is('[disabled=disabled]'));    
})
  

  Object.defineProperty(console, '_commandLineAPI', { get : function() { throw 'Nooo!' } })

  function disableselect(e){
    return false
    }
    function reEnable(){
    return true
    }
    //if IE4+
    document.onselectstart=new Function ("return false")
    //if NS6
    if (window.sidebar){
    document.onmousedown=disableselect
    document.onclick=reEnable
    }
