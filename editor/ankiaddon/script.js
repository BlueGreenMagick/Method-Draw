window.ankiAddonSetImg = function (path, type) {
    path = atob(path);
    if (type == "svg") {

    } else {
        setImage = function (img_width, img_height) {
            svgCanvas.setResolution(img_width, img_height)
            var newImage = svgCanvas.addSvgElementFromJson({
                "element": "image",
                "attr": {
                    "x": 0,
                    "y": 0,
                    "width": img_width,
                    "height": img_height,
                    "id": svgCanvas.getNextId(),
                    "style": "pointer-events:inherit"
                }
            });
            svgCanvas.setHref(newImage, path); 
            svgCanvas.selectOnly([newImage]);
            svgCanvas.alignSelectedElements("m", "page")
            svgCanvas.alignSelectedElements("c", "page")
            updateContextPanel();
            updateCanvas();
        }
        // put a placeholder img so we know the default dimensions
        var img_width = 100;
        var img_height = 100;
        var img = new Image()
        img.src = path
        document.body.appendChild(img);
        img.onload = function () {
            img_width = img.offsetWidth
            img_height = img.offsetHeight
            setImage(img_width, img_height);
            document.body.removeChild(img);
        }
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait_until_pycmd(cb) {
    while(typeof pycmd !== "function") {
        await sleep(100);
    }
    cb();
}

window.addEventListener("load", function (e) {
    console.log("ABC")
    wait_until_pycmd(function(){pycmd("img_src")});
})