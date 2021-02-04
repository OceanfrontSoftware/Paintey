const path = require('path');
var fs = require('fs');
const s3 = require('../modules/s3.js')
const express = require('express');
const router = express.Router()


router.get('/:id', function (req, res) {
    var id = req.params.id;

    var indexPath = path.join(__dirname, '../_static/index.html');
    
    fs.readFile(indexPath, 'utf8', function(err, html){
        if(err) throw err;

        var metaTags = meta.replaceAll("#id#", id);
        var body = template.replaceAll("#id#", id);
        
        html = html.replace('Vue App', 'Paintey - Paint and share online!')
        html = html.replace('<div id="app"></div>', body);
        html = html.replace('<head>', '<head>' + metaTags);
        res.send(html);
    })
    
    
})

const meta = `
<meta name='description' content='Make a new painting online with Paintey'>
<meta property='og:url' content='https://paintey.com/painting/#id#'>
<meta property='og:type' content='website'>
<meta property='og:title' content='My painting on Paintey'>
<meta property='og:description' content='Paint and share online with Paintey!'>
<meta property='og:image' content='https://image.paintey.com/#id#.jpg'>`;

const template = `
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0" nonce="6UwAgDmU"></script>
<div id="app"></div>
<div>
<div class="container">
   <div class="row">
      <div class="col">
         <img src="https://image.paintey.com/#id#.jpg" class="img-thumbnail img-fluid">
         <a download="paintey.png" href="https://image.paintey.com/#id#.jpg" target="_self" class="btn btn-secondary">Download</a>
         <button data-href="https://paintey.com/share/#id#" data-layout="button" data-size="small" type="button" class="btn fb-share-button btn-secondary"> 
            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpaintey.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore share-button" style="color:#fff;">Share on Facebook</a>
        </button>
      </div>
   </div>
   <div id="fb-root" class=" fb_reset">
      <div style="position: absolute; top: -10000px; width: 0px; height: 0px;">
         <div></div>
      </div>
   </div>
</div>
</div>`;


module.exports = router;