
const Comparison = () => {
//------------------------------------------------------------
    //COMPARISON ITEM-CHECK-------------------------------------------------
    function compareItemCheck() {
    	let prodItem = document.querySelectorAll(".comparison-product-item");
    	let propItems = document.querySelectorAll('.comparison-property-item');
    	let compareProducts = document.querySelector('.comparison-products__inner')
    	if (prodItem.length === 0)	{
    		propItems.forEach(item => {
    			item.remove()
    		})
    		let notChosenBlock = document.createElement('div')
    		notChosenBlock.innerHTML = "<span>Не выбрано элементов для сравнения</span>"
    		notChosenBlock.classList.add('notChosen')
    		compareProducts.appendChild(notChosenBlock)
    	}
    }
    //----------------------------------------------------------------------
    //COMPARISON CORRECT COMPARISON PRODUCT_HEIGHT--------------------------
    function correctComparisonHeight () {

        let productImg = document.querySelector('.comparison-product-item-img img')
        let productImages = document.querySelectorAll('.comparison-product-item-img')
        let productImgWidth = window.getComputedStyle (productImg, null).width
        productImgWidth.slice(0, productImgWidth.length - 2)
        productImages.forEach(img => {
            img.style.height = productImgWidth*0.65 + 'px'
        })
    }
    correctComparisonHeight ()
    window.addEventListener('resize', () => correctComparisonHeight())
//-----------------------------------------------------------
//COMPARISON ADD PROPERTY DIVIDER---------------------------------------
    function propValAddLine() {
        let propValue = document.querySelectorAll('.compare-property-value')
        propValue.forEach(item => item.classList.add('topLined'))
    }
    propValAddLine()


//
//COMPARISON DELETE PRODUCT-ITEM --------------------------------------
    function compareDeleteItem() {
        let delBtn = document.querySelectorAll('.comparison-remove-btn');
        let propRaw = document.querySelectorAll('.compare-property-values');
        let propItem = document.querySelectorAll(".comparison-product-item");

        delBtn.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()

                propItem[index].remove()
                propRaw.forEach((raw) => {
                    let targetColumn = raw.getElementsByTagName("LI")
                    targetColumn[index].style.display="none";
                })
                compareItemCheck()
            })

        })

    }
    compareDeleteItem()


//---------------------------------------------------------------------
//COMPARISON OVERLAY SCROLLBAR-------------------------------------------
    function compare() {
        let $comparePropertiesScroll= $('.comparison-properties__inner');
        let $compareProductsScroll = $('.comparison-products__inner');
        let product = $('.comparison-product-item')
        let $prev = $('.comparison__arrows_prev');
        let $next = $('.comparison__arrows_next');
        var $body = $('body');
        let shift = $('.comparison-product-item').css("min-width");
        shift.slice(0, shift.length - 2);
        let $compareScrollable = $('.comparison-content')



        var osCompareScrollable = $compareScrollable.overlayScrollbars({
            className: 'os-theme-giant',
            overflowBehavior: {
                x: 'hidden'
            },
            callbacks : {
                onScroll : function(eventArgs) {
                    var scrollState =  osCompareScrollable.scroll();
                    // osCompareScrollable.scroll({x: scrollState.position.x});
                },
            }
        }).overlayScrollbars();

        $prev.on('click', (e) => {
            e.preventDefault()

            function scrollLeft() {
                let state = osCompareScrollable.scroll();
                // if (state.position.x > 0) {
                osCompareScrollable.scroll({x: `-=${shift}`}, 500);
                // }
            }
            scrollLeft()
        })

        $next.on('click', (e) => {
            e.preventDefault()

            function scrollRight() {

                let state = osCompareScrollable.scroll();
                if (state.position.x < state.max.x - 46) {
                    osCompareScrollable.scroll({x: `+=${shift}`}, 500);

                }
            }
            scrollRight()
        })
        function scrollStart () {
            let state = osCompareScrollable.scroll();

            shift = $('.comparison-product-item').css("min-width")
            shift.slice(0, shift.length - 2);
            osCompareScrollable.scroll({x: shift});
        }

        window.addEventListener("resize", () => scrollStart())
    }
    compare()
}
export default Comparison