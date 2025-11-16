const colorDisplay = document.getElementsByClassName("color-display");
const hexFooter = document.getElementsByClassName("hex-footer")
document.getElementById("get-color-scheme").addEventListener("click", function() {
    const seedColor = document.getElementById("seed-color").value;
    const colorScheme = document.getElementById("select-menu").value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.substring(1)}&mode=${colorScheme}&count=5`)
        
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.colors.length; i++) {
                const hexValue = data.colors[i].hex.value;
                document.getElementById(`dis${i + 1}`).style.backgroundColor = hexValue;
                document.getElementById(`ftr${i + 1}`).innerHTML = `
                    <p id="hex-value">${hexValue}
                    <span class="tooltiptext">copy hex code</span>
                    </p>    
                `;
            }
        })

    for (let i = 0; i < colorDisplay.length; i++) {
        function setScale() {
            colorDisplay[i].style.scale = "1.05";
            colorDisplay[i].style.zIndex = "10";
        }
        colorDisplay[i].addEventListener("mouseover", setScale);
        colorDisplay[i].addEventListener("touchstart", setScale);

        function resetScale() {
            colorDisplay[i].style.scale = "1";
            colorDisplay[i].style.zIndex = "0";
        }
        colorDisplay[i].addEventListener("mouseout", resetScale);
        colorDisplay[i].addEventListener("touchmove", resetScale);

        colorDisplay[i].style.cursor = "pointer";
        colorDisplay[i].style.visibility = "visible";
        
        colorDisplay[i].addEventListener("click", function() {
        const bgColor = this.style.backgroundColor;
        /*here I'm extracting the rgb number values to call the rgb2hex function*/
        navigator.clipboard.writeText(rgb2hex(...bgColor.match(/\d+/g)));
        const tooltip = this.querySelector(".tooltiptext");
        tooltip.innerText = `Copied!`;
        tooltip.style.visibility = "visible";
        setTimeout(() => {
            tooltip.style.visibility = "hidden";
            /*reset scale and z-index in case of mobile touch*/
            resetScale();
        }, 1000);
        })
    }

    for (let i = 0; i < hexFooter.length; i++) {
    hexFooter[i].addEventListener("click", function() {
        const hexText = this.innerText.substring(0, 7);
        navigator.clipboard.writeText(hexText);
        const tooltip = this.querySelector(".tooltiptext");
        tooltip.innerText = `Copied!`;
        tooltip.style.visibility = "visible";
        setTimeout(() => {
            tooltip.style.visibility = "hidden";
        }, 1000);
        })
    }
})

document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("exp-modal").style.display = "none";
    document.getElementById("header").style.backgroundColor ="#f8f8f8";
    document.getElementById("colors").style.backgroundColor ="#f8f8f8";
});

/*media query experiment*/
const mq1 = window.matchMedia("(min-width: 768px)");
function mobileMq1(mq1) {
    if (mq1.matches) {
        document.getElementById("title").innerHTML = "<h1>HexaColor</h1>";
        /*document.getElementById("header-txt").style.margin = "0 0.4em";*/
    } else {
        document.getElementById("title").innerText = "";
        document.getElementById("header-txt").style.backgroundColor = "pink";
    }
    
}
/*the following is necessary...but why?*/
mobileMq1(mq1);
mq1.addEventListener("change", mobileMq1);
/*mq experiment ends here*/

/* RGB to HEX conversion function from Nimish Prabhu: 
https://nimishprabhu.com/convert-rgb-to-hex-and-hex-to-rgb-javascript-online-demo.html */

function rgb2hex(r, g, b) {
    try {
        var rHex = parseInt(r).toString(16).padStart(2, '0');
        var gHex = parseInt(g).toString(16).padStart(2, '0');
        var bHex = parseInt(b).toString(16).padStart(2, '0');
    } catch (e) {
        return false;
    }
    if (rHex.length > 2 || gHex.length > 2 || bHex.length > 2) return false;
    return '#' + rHex + gHex + bHex;
}