//-------------------------------------//
// Banner Buy Button Scrolling to Customization Section Functionality  //
//-------------------------------------//















//-------------------------------------//
// Changing Dial Preview Functionality //
//-------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    // Select all interactive elements
    const dialColors = document.querySelectorAll(".dialcolor");
    const dialMovements = document.querySelectorAll(".dialmovement");
    const dialDesigns = document.querySelectorAll(".dialdesign");
    const dialIndices = document.querySelectorAll(".dialindex");
    const dialSizes = document.querySelectorAll(".dialsize");

    // Get preview elements
    const dialBaseImage = document.getElementById("dialBaseImage");
    const dialMovementOverlay = document.getElementById("dialMovementOverlay");
    const dialDesignOverlay = document.getElementById("dialDesignOverlay");
    const dialIndexOverlay = document.getElementById("dialIndexOverlay");

    // Default selections
    const defaultSelections = {
        size: null,
        movement: "none",
        color: "white",
        design: "none",
        index: "none" // No default index
    };

    let selectedDialColor = `./img/dialcolors/${defaultSelections.color}.png`;
    let selectedMovement = defaultSelections.movement ? `./img/dialmovements/${defaultSelections.movement}.png` : null;
    let selectedDesign = defaultSelections.design ? `./img/dialdesigns/${defaultSelections.design}.png` : null;
    let selectedIndex = defaultSelections.index ? `./img/dialindices/${defaultSelections.index}.png` : null;

    // Set initial default image
    dialBaseImage.src = selectedDialColor;

    // Utility to clear selected classes
    const clearSelected = (elements) => {
        elements.forEach(el => el.classList.remove("selected"));
    };

    // Utility to add hover effect
    const addHoverEffect = (elements, imageElement, folder, type) => {
        elements.forEach(element => {
            element.addEventListener("mouseenter", function () {
                const value = this.dataset.value;
                imageElement.src = `./img/${folder}/${value}.png`;
                imageElement.style.display = "block";
            });
            element.addEventListener("mouseleave", function () {
                const selectedValue = type === "color" ? selectedDialColor :
                    type === "movement" ? selectedMovement :
                        type === "design" ? selectedDesign : selectedIndex;

                if (selectedValue) {
                    imageElement.src = selectedValue;
                    imageElement.style.display = "block";
                } else if (type === "color") {
                    imageElement.src = selectedDialColor;
                } else {
                    imageElement.style.display = "none";
                }
            });
        });
    };

    // Utility to handle click and selection
    const handleClick = (elements, imageElement, folder, type) => {
        elements.forEach(element => {
            element.addEventListener("click", function () {
                clearSelected(elements);
                this.classList.add("selected");

                const value = this.dataset.value;
                const newValue = `./img/${folder}/${value}.png`;

                if (type === "color") {
                    selectedDialColor = newValue;
                    dialBaseImage.src = selectedDialColor;
                } else if (type === "movement") {
                    selectedMovement = newValue;
                    imageElement.src = selectedMovement;
                } else if (type === "design") {
                    selectedDesign = newValue;
                    imageElement.src = selectedDesign;
                } else if (type === "index") {
                    selectedIndex = newValue;
                    imageElement.src = selectedIndex;
                }
            });
        });
    };

    // Apply default selections
    const applyDefaultSelection = (elements, category, value) => {
        const defaultElement = [...elements].find(el => el.dataset.value === value);
        if (defaultElement) {
            defaultElement.classList.add("selected");
            if (category === "size") {
                // Size does not update overlays
            } else if (category === "movement") {
                dialMovementOverlay.src = `./img/dialmovements/${value}.png`;
            } else if (category === "color") {
                dialBaseImage.src = `./img/dialcolors/${value}.png`;
            } else if (category === "design") {
                dialDesignOverlay.src = `./img/dialdesigns/${value}.png`;
            } else if (category === "index") {
                dialIndexOverlay.src = value ? `./img/dialindices/${value}.png` : "";
            }
        }
    };

    applyDefaultSelection(dialSizes, "size", defaultSelections.size);
    applyDefaultSelection(dialMovements, "movement", defaultSelections.movement);
    applyDefaultSelection(dialColors, "color", defaultSelections.color);
    applyDefaultSelection(dialDesigns, "design", defaultSelections.design);
    applyDefaultSelection(dialIndices, "index", defaultSelections.index);

    // Add hover and click effects to all elements
    addHoverEffect(dialColors, dialBaseImage, "dialcolors", "color");
    addHoverEffect(dialMovements, dialMovementOverlay, "dialmovements", "movement");
    addHoverEffect(dialDesigns, dialDesignOverlay, "dialdesigns", "design");
    addHoverEffect(dialIndices, dialIndexOverlay, "dialindices", "index");

    handleClick(dialColors, dialBaseImage, "dialcolors", "color");
    handleClick(dialMovements, dialMovementOverlay, "dialmovements", "movement");
    handleClick(dialDesigns, dialDesignOverlay, "dialdesigns", "design");
    handleClick(dialIndices, dialIndexOverlay, "dialindices", "index");
    handleClick(dialSizes, dialBaseImage, "dialsizes", "size");
});



















//----------------------------------------------------//
// Dial Customization Section Opening / Closing Logic //
//----------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    // Select all section titles and sections
    const sectionTitles = document.querySelectorAll(
        '.dialsizestitles, .dialmovementstitles, .dialcolorstitles, .dialdesignstitles, .dialindiciestitles, .diallogostitles'
    );
    const sections = document.querySelectorAll(
        '.dialcustomization .dialsizes, .dialcustomization .dialmovements, .dialcustomization .dialcolors, .dialcustomization .dialdesigns, .dialcustomization .dialindicies, .dialcustomization .diallogos'
    );

    // Open the first section (Dial Size) by default
    const firstSection = document.querySelector('.dialsizes');
    if (firstSection) {
        firstSection.style.display = 'flex';
    }

    /**
     * Scrolls the section title into view, ensuring it is securely positioned 15% from the top of the viewport.
     * If the section is too long, ensures the title remains visible and does not go off-screen.
     * @param {Element} titleElement - The section title element to scroll to.
     */
    const scrollToTitleWithOffset = (titleElement) => {
        const viewportHeight = window.innerHeight;
        const titlePosition = titleElement.getBoundingClientRect().top + window.scrollY;
        const offset = viewportHeight * 0.10; // 15% from the top

        // Ensure the title doesn't scroll out of the visible viewport
        const maxScrollTop = document.documentElement.scrollHeight - viewportHeight;
        const targetScrollPosition = Math.min(titlePosition - offset, maxScrollTop);

        window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth',
        });
    };

    // Toggle sections and scroll to titles
    sectionTitles.forEach((sectionTitle) => {
        sectionTitle.addEventListener('click', function () {
            const targetSection = sectionTitle.nextElementSibling;

            // Toggle visibility of the clicked section
            if (targetSection && targetSection.style.display === 'flex') {
                targetSection.style.display = 'none';
            } else if (targetSection) {

                // Open the clicked section
                targetSection.style.display = 'flex';

                // Scroll to the title
                scrollToTitleWithOffset(sectionTitle);
            }
        });
    });

    /**
     * Adds navigation behavior between sections, scrolling to their titles.
     * @param {NodeListOf<Element>} triggerElements - Elements triggering the scroll.
     * @param {Element} targetTitle - The title of the section to scroll to.
     */
    const addNavigationScroll = (triggerElements, targetTitle) => {
        triggerElements.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const targetSection = targetTitle.nextElementSibling;
                if (targetSection) {
                    targetSection.style.display = 'flex';
                }
                scrollToTitleWithOffset(targetTitle);
            });
        });
    };

    // Define navigation between sections
    addNavigationScroll(
        document.querySelectorAll('.dialsize'),
        document.querySelector('.dialmovementstitles')
    );
    addNavigationScroll(
        document.querySelectorAll('.dialmovement'),
        document.querySelector('.dialcolorstitles')
    );
    addNavigationScroll(
        document.querySelectorAll('.dialcolor'),
        document.querySelector('.dialdesignstitles')
    );
    addNavigationScroll(
        document.querySelectorAll('.dialdesign'),
        document.querySelector('.dialindiciestitles')
    );
    addNavigationScroll(
        document.querySelectorAll('.dialindex'),
        document.querySelector('.diallogostitles')
    );
});



















//---------------------------------------------------//
// Dial Design & Index Color Selection Functionality //
//---------------------------------------------------//

//---------------------------------------------------//
// Dial Design & Index Color Selection Functionality //
//---------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTitleWithOffset = (section) => {
        const titlePosition = section.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight * 0.15; // 15% from the top
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        const targetScrollPosition = Math.min(titlePosition - offset, maxScrollTop);

        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth",
        });
    };

    // Replace the helper function to use the new scrolling logic
    const scrollToSection = (section) => scrollToTitleWithOffset(section);

    // Remaining logic is unchanged...

    // Get all the elements
    const dialDesigns = document.querySelectorAll(".dialdesign");
    const dialIndices = document.querySelectorAll(".dialindex");
    const dialDesignColors = document.querySelectorAll(".dialdesigncolors .colorOption");
    const dialIndexColors = document.querySelectorAll(".dialincidiescolors .colorOption");

    // Preview images
    const dialDesignOverlay = document.getElementById("dialDesignOverlay");
    const dialIndexOverlay = document.getElementById("dialIndexOverlay");

    // Sections
    const dialDesignColorSection = document.querySelector(".dialdesigncolors");
    const dialIndexColorSection = document.querySelector(".dialincidiescolors");
    const dialIndicesSection = document.querySelector(".dialindicies");
    const dialLogosSection = document.querySelector(".diallogos");
    const dialIndiciesTitle = document.querySelector(".dialindiciestitles")
    const dialLogosTitle = document.querySelector(".diallogostitles");

    // Initially hide color sections
    dialDesignColorSection.style.display = "none";
    dialIndexColorSection.style.display = "none";

    // Track user selections
    let selectedDesign = null;
    let selectedIndex = null;
    let selectedDesignColor = null;
    let selectedIndexColor = null;

    // Helper to show/hide color options
    const showColorOptions = (category) => {
        if (category === "design") {
            dialDesignColorSection.style.display = "flex";
        } else {
            dialIndexColorSection.style.display = "flex";
        }
    };



    //-----------------------//
    // Dial Design Selection //
    //-----------------------//

    dialDesigns.forEach(design => {
        design.addEventListener("click", function () {
            selectedDesign = this.dataset.value;
            dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}.png`;

            // Visually mark selected
            dialDesigns.forEach(d => d.classList.remove("selected"));
            this.classList.add("selected");

            // If user selected "No Design", skip color section
            if (selectedDesign === "none") {
                // Hide color selection
                dialDesignColorSection.style.display = "none";

                // Make sure the indices section is displayed if it’s hidden
                if (dialIndicesSection.style.display !== "flex") {
                    dialIndicesSection.style.display = "flex";
                }
                // Immediately scroll to indices section
                scrollToSection(dialIndiciesTitle);
            } else {
                // Otherwise, show color selection for designs
                showColorOptions("design");
                scrollToSection(dialDesignColorSection);
            }
        });

        // Hover effect
        design.addEventListener("mouseover", function () {
            if (!selectedDesign) {
                dialDesignOverlay.src = `./img/dialdesigns/${this.dataset.value}.png`;
            }
        });
        design.addEventListener("mouseout", function () {
            if (!selectedDesign) {
                dialDesignOverlay.src = `./img/dialdesigns/none.png`;
            }
        });
    });


    //----------------------//
    // Dial Index Selection //
    //----------------------//

    dialIndices.forEach(index => {
        index.addEventListener("click", function () {
            selectedIndex = this.dataset.value;
            dialIndexOverlay.src = `./img/dialindices/${selectedIndex}.png`;

            // Visually mark selected
            dialIndices.forEach(i => i.classList.remove("selected"));
            this.classList.add("selected");

            // If user selected "No Index", skip color section
            if (selectedIndex === "none") {
                // Hide color selection
                dialIndexColorSection.style.display = "none";

                // Make sure the logos section is displayed if it’s hidden
                if (dialLogosSection.style.display !== "flex") {
                    dialLogosSection.style.display = "flex";
                }
                // Immediately scroll to logos section
                scrollToSection(dialLogosTitle);
            } else {
                // Otherwise, show color options for index
                showColorOptions("index");
                scrollToSection(dialIndexColorSection);
            }
        });

        // Hover effect
        index.addEventListener("mouseover", function () {
            if (!selectedIndex) {
                dialIndexOverlay.src = `./img/dialindices/${this.dataset.value}.png`;
            }
        });
        index.addEventListener("mouseout", function () {
            if (!selectedIndex) {
                dialIndexOverlay.src = `./img/dialindices/none.png`;
            }
        });
    });


    //------------------------------//
    // Dial Design Colour Selection //
    //------------------------------//

    dialDesignColors.forEach(color => {
        color.addEventListener("click", function () {
            selectedDesignColor = this.dataset.value;
            dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}_${selectedDesignColor}.png`;

            // Visually mark selected
            dialDesignColors.forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");

            // If user chooses a design color, reveal / scroll to Indicies section
            if (dialIndicesSection.style.display !== "flex") {
                dialIndicesSection.style.display = "flex";
            }
            scrollToSection(dialIndiciesTitle);
        });

        // Hover effect
        color.addEventListener("mouseover", function () {
            if (selectedDesign) {
                dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}_${this.dataset.value}.png`;
            }
        });
        color.addEventListener("mouseout", function () {
            if (selectedDesign) {
                dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}_${selectedDesignColor}.png`;
            }
        });

        // Revert to selected design if no color is chosen, or reset overlay
        color.addEventListener("mouseout", function () {
            if (selectedDesignColor) {
                dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}_${selectedDesignColor}.png`;
            } else if (selectedDesign) {
                dialDesignOverlay.src = `./img/dialdesigns/${selectedDesign}.png`;
            } else {
                dialDesignOverlay.src = ""; // Reset to default state
            }
        });
    });


    //-----------------------------//
    // Dial Index Colour Selection //
    //-----------------------------//

    dialIndexColors.forEach(color => {
        // Click event for selecting a color
        color.addEventListener("click", function () {
            selectedIndexColor = this.dataset.value;
            dialIndexOverlay.src = `./img/dialindices/${selectedIndex}_${selectedIndexColor}.png`;

            // Visually mark selected color
            dialIndexColors.forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");

            // Reveal or scroll to logos section if not visible
            if (dialLogosSection.style.display !== "flex") {
                dialLogosSection.style.display = "flex";
            }
            scrollToSection(dialLogosTitle);
        });

        // Hover effect for previewing the color
        color.addEventListener("mouseover", function () {
            if (selectedIndex) {
                dialIndexOverlay.src = `./img/dialindices/${selectedIndex}_${this.dataset.value}.png`;
            }
        });

        // Revert to selected index if no color is chosen, or reset overlay
        color.addEventListener("mouseout", function () {
            if (selectedIndexColor) {
                dialIndexOverlay.src = `./img/dialindices/${selectedIndex}_${selectedIndexColor}.png`;
            } else if (selectedIndex) {
                dialIndexOverlay.src = `./img/dialindices/${selectedIndex}.png`;
            } else {
                dialIndexOverlay.src = ""; // Reset to default state
            }
        });
    });
});



















//-----------------------------------------
// Custom Dial Size Hidden Option's Logic
//-----------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTitleWithOffset = (section) => {
        const titlePosition = section.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight * 0.15; // 15% from the top
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        const targetScrollPosition = Math.min(titlePosition - offset, maxScrollTop);

        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth",
        });
    };

    const customSizeButton = document.querySelector('.dialsize[data-value="custom"]');
    const customSizeSection = document.querySelector('.customSizeSection');
    const saveButton = document.getElementById('saveCustomSize');
    const dialMovementsSection = document.querySelector('.dialmovements');
    const dialMovementsTitle = document.querySelector('.dialmovementstitles')
    const dialSizeOptions = document.querySelectorAll('.dialsize');  // Assuming these represent all the options

    // Initially hide dial movements section
    dialMovementsSection.style.display = "none";

    // Custom Size button functionality
    customSizeButton.addEventListener("click", () => {
        // Toggle visibility of the custom size section
        if (customSizeSection.style.display === "none") {
            customSizeSection.style.display = "flex";
            customSizeSection.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            customSizeSection.style.display = "none";
        }

        // Hide dial movements section when custom size is selected
        dialMovementsSection.style.display = "none";
    });

    // Handle non-custom size selection
    dialSizeOptions.forEach(button => {
        button.addEventListener("click", () => {
            if (button !== customSizeButton) {
                customSizeSection.style.display = "none";  // Hide custom size section when a non-custom option is selected
                dialMovementsSection.style.display = "flex"; // Show dial movements section if other size option is selected

                // Scroll to dial movements section after it's displayed
                scrollToTitleWithOffset(dialMovementsTitle)
            }
        });
    });

    // Save button functionality for custom size
    saveButton.addEventListener("click", () => {
        // Validate inputs
        const dialDiameter = parseFloat(document.getElementById('dialDiameter').value);
        const additionalComments = document.getElementById('additionalComments').value;
        const uploadFile = document.getElementById('uploadDialShape').files[0];

        if (!dialDiameter || dialDiameter < 20 || dialDiameter > 50) {
            alert("Please enter a valid diameter (20-50 mm).");

            // Reset the diameter input to the nearest valid value
            const resetValue = dialDiameter < 20 ? 20 : 50;
            document.getElementById('dialDiameter').value = resetValue;

            return;
        }

        // Proceed to the next section
        dialMovementsSection.style.display = "flex";  // Show dial movements section when saved
        scrollToTitleWithOffset(dialMovementsTitle)
    });
});



















//-----------------------------------------
// Custom Movement Hidden Option's Logic
//-----------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTitleWithOffset = (section) => {
        const titlePosition = section.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight * 0.15; // 15% from the top
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        const targetScrollPosition = Math.min(titlePosition - offset, maxScrollTop);

        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth",
        });
    };

    const customMovementButton = document.querySelector('.dialmovement[data-value="custom"]'); // Assuming "none" is for custom movement
    const customMovementSection = document.querySelector('.customMovementSection');
    const saveButton = document.getElementById('saveCustomMovement');
    const dialColorsSection = document.querySelector('.dialcolors');
    const dialColorsTitle = document.querySelector('.dialcolorstitles')
    const dialMovementOptions = document.querySelectorAll('.dialmovement');

    // Initially hide dial colors section
    dialColorsSection.style.display = "none";

    // Custom Movement button functionality
    customMovementButton.addEventListener("click", () => {
        // Toggle visibility of the custom movement section
        if (customMovementSection.style.display === "none") {
            customMovementSection.style.display = "flex";
            customMovementSection.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            customMovementSection.style.display = "none";
        }

        // Hide dial colors section when custom movement is selected
        dialColorsSection.style.display = "none";
    });

    // Handle non-custom movement selection
    dialMovementOptions.forEach(button => {
        button.addEventListener("click", () => {
            if (button !== customMovementButton) {
                customMovementSection.style.display = "none";  // Hide custom movement section when a non-custom option is selected
                dialColorsSection.style.display = "flex"; // Show dial colors section if other movement option is selected

                // Scroll to dial colors section after it's displayed
                scrollToTitleWithOffset(dialColorsTitle)
            }
        });
    });

    // Save button functionality for custom movement
    saveButton.addEventListener("click", () => {
        const customMovementName = document.getElementById('customMovement').value;

        if (!customMovementName.trim()) {
            alert("Please enter a valid movement name.");
            return;
        }

        // Proceed to the next section
        dialColorsSection.style.display = "flex";  // Show dial colors section when saved
        scrollToTitleWithOffset(dialColorsTitle)
    });
});


















//--------------------------------------------
// Dial Preview Hoving Centre Functionality
//--------------------------------------------

// Get the dial preview element
const dialPreview = document.querySelector(".dialPreview");

// Get the dial preview container element
const dialPreviewContainer = document.querySelector('.dialPreviewContainer');

// Listen to window scroll events
window.addEventListener('scroll', () => {
    const containerTop = dialPreviewContainer.getBoundingClientRect().top;

    if (containerTop <= 0) {
        // If the container is at the top of the screen, make the dial preview sticky
        dialPreview.classList.add('sticky');
    } else {
        // If the container is scrolled down, remove the sticky class
        dialPreview.classList.remove('sticky');
    }
});



















// File Previewing Under Uploaded Files Functionality


document.addEventListener("DOMContentLoaded", function () {
    const upperLogoInput = document.getElementById("upper-logo");
    const lowerLogoInput = document.getElementById("lower-logo");

    const upperLogoPreview = document.getElementById("upper-logo-preview");
    const lowerLogoPreview = document.getElementById("lower-logo-preview");

    // Handle file preview for Upper Logo
    upperLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const preview = document.createElement("img");
                preview.src = event.target.result;
                upperLogoPreview.innerHTML = ""; // Clear previous preview
                upperLogoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        } else {
            upperLogoPreview.innerHTML = "<p>Please upload a valid PNG or SVG file.</p>";
        }
    });

    // Handle file preview for Lower Logo
    lowerLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const preview = document.createElement("img");
                preview.src = event.target.result;
                lowerLogoPreview.innerHTML = ""; // Clear previous preview
                lowerLogoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        } else {
            lowerLogoPreview.innerHTML = "<p>Please upload a valid PNG or SVG file.</p>";
        }
    });
});


















//-------------------------------------//
// Uploading Custom Logo Functionality //
//-------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    const upperLogoInput = document.getElementById("upper-logo");
    const lowerLogoInput = document.getElementById("lower-logo");
    const dialPreview = document.querySelector(".dialPreview");
    const upperLogoPreview = document.getElementById("upper-logo-preview");
    const lowerLogoPreview = document.getElementById("lower-logo-preview");

    function createResizableImage(file, target, previewTarget, previewElement) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgContainer = document.createElement("divFlo");
            imgContainer.classList.add("resizable-image-container");

            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("resizable-image");

            const removeButton = document.createElement("div");
            removeButton.textContent = "X";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", function () {
                target.removeChild(imgContainer);
                previewElement.innerHTML = ""; // Clear the logo preview
                previewTarget.value = ""; // Reset the file input field
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(removeButton);
            target.appendChild(imgContainer);

            makeElementResizable(imgContainer);
            makeElementDraggable(imgContainer, target);

            // Show controls when hovering over the image container
            imgContainer.addEventListener("mouseenter", function () {
                imgContainer.classList.add("show-controls");
            });

            // Hide controls when leaving the image container (unless it's clicked)
            imgContainer.addEventListener("mouseleave", function () {
                if (!imgContainer.classList.contains("clicked")) {
                    imgContainer.classList.remove("show-controls");
                }
            });

            // Click to keep controls visible until clicked outside
            imgContainer.addEventListener("click", function () {
                imgContainer.classList.add("clicked");
                imgContainer.classList.add("show-controls");
                // Prevent click from propagating to body
                event.stopPropagation();
            });
        };
        reader.readAsDataURL(file);
    }

    upperLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            createResizableImage(file, dialPreview, upperLogoInput, upperLogoPreview);
        } else {
            alert("Please upload a valid PNG or SVG file.");
        }
    });

    lowerLogoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
            createResizableImage(file, dialPreview, lowerLogoInput, lowerLogoPreview);
        } else {
            alert("Please upload a valid PNG or SVG file.");
        }
    });

    // Detect clicks outside of the image container to hide controls
    document.addEventListener("click", function (e) {
        const clickedInside = e.target.closest(".resizable-image-container");
        if (!clickedInside) {
            const allContainers = document.querySelectorAll(".resizable-image-container");
            allContainers.forEach(container => {
                container.classList.remove("clicked");
                container.classList.remove("show-controls");
            });
        }
    });

    function makeElementDraggable(element, container) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.cursor = "grabbing";
            e.preventDefault();
        });

        window.addEventListener("mousemove", function (e) {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                const rect = container.getBoundingClientRect();
                const elemRect = element.getBoundingClientRect();

                newX = Math.max(0, Math.min(newX, rect.width - elemRect.width));
                newY = Math.max(0, Math.min(newY, rect.height - elemRect.height));

                element.style.left = newX + "px";
                element.style.top = newY + "px";
            }
        });

        window.addEventListener("mouseup", function () {
            isDragging = false;
            element.style.cursor = "grab";
        });
    }

    function makeElementResizable(element) {
        const resizeHandles = [
            "top", "bottom", "left", "right",
            "top-left", "top-right", "bottom-left", "bottom-right"
        ];

        resizeHandles.forEach(handle => {
            const resizeHandle = document.createElement("div");
            resizeHandle.classList.add("resize-handle", handle);

            // Use a small helper map for the correct CSS cursors:
            const cursorMap = {
                top: 'n-resize',
                bottom: 's-resize',
                left: 'w-resize',
                right: 'e-resize',
                'top-left': 'nw-resize',
                'top-right': 'ne-resize',
                'bottom-left': 'sw-resize',
                'bottom-right': 'se-resize',
            };
            resizeHandle.style.cursor = cursorMap[handle];

            resizeHandle.addEventListener("mousedown", function (e) {
                e.preventDefault();

                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = element.offsetWidth;
                const startHeight = element.offsetHeight;
                const startLeft = element.offsetLeft;
                const startTop = element.offsetTop;

                function resizeHandler(moveEvent) {
                    const deltaX = moveEvent.clientX - startX;
                    const deltaY = moveEvent.clientY - startY;

                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    // Horizontal resizing
                    if (handle.includes("left")) {
                        // Keep the left edge “under the mouse” by moving 'left' and shrinking width
                        newWidth = startWidth - deltaX;
                        newLeft = startLeft + deltaX;
                    } else if (handle.includes("right")) {
                        // Expand width from the right side
                        newWidth = startWidth + deltaX;
                    }

                    // Vertical resizing
                    if (handle.includes("top")) {
                        // Keep the top edge “under the mouse”
                        newHeight = startHeight - deltaY;
                        newTop = startTop + deltaY;
                    } else if (handle.includes("bottom")) {
                        newHeight = startHeight + deltaY;
                    }

                    // Restrict minimum size if desired
                    if (newWidth > 50) {
                        element.style.width = newWidth + "px";
                        element.style.left = newLeft + "px";
                    }
                    if (newHeight > 50) {
                        element.style.height = newHeight + "px";
                        element.style.top = newTop + "px";
                    }
                }

                function stopResizeHandler() {
                    window.removeEventListener("mousemove", resizeHandler);
                    window.removeEventListener("mouseup", stopResizeHandler);
                }

                window.addEventListener("mousemove", resizeHandler);
                window.addEventListener("mouseup", stopResizeHandler);
            });

            element.appendChild(resizeHandle);
        });
    }

});



















// inserting text functionality

document.addEventListener("DOMContentLoaded", () => {
    // Reset checkboxes, dropdowns, and inputs to their defaults
    document.querySelectorAll('.text-bold-toggle, .text-italic-toggle, .text-underline-toggle').forEach(ck => {
        ck.checked = false; // Uncheck bold, italic, underline
    });

    document.querySelectorAll('.font-family-select').forEach(select => {
        select.value = "Times New Roman"; // Reset font-family to default
    });

    document.querySelectorAll('.font-size-input').forEach(input => {
        input.value = 30; // Reset font-size to 30
    });

    document.querySelectorAll('.font-color-select').forEach(select => {
        select.value = "#000000"; // Reset color to black
    });

    document.querySelectorAll('.font-displacement-input').forEach(input => {
        input.value = ""; // Clear displacement inputs
    });

    document.querySelectorAll('.custom-text-input').forEach(input => {
        input.value = ""; // Clear text inputs
    });

    // Clear all displayed preview text
    document.querySelectorAll(".custom-text").forEach(textElement => {
        textElement.textContent = "";
    });


    const textSections = ["upper", "lower"];
    const linesPerSection = 4;

    textSections.forEach(section => {
        const sectionGroup = document.createElement("div");
        sectionGroup.classList.add("text-group");
        sectionGroup.dataset.section = section;
        sectionGroup.style.position = "absolute";
        sectionGroup.style.left = "50%";
        sectionGroup.style.transform = "translateX(-50%)";
        sectionGroup.style.cursor = "grab";
        sectionGroup.style.userSelect = "none";

        // Initial top for upper/lower
        sectionGroup.style.top = section === "upper" ? "30%" : "70%";
        document.querySelector(".dialPreview").appendChild(sectionGroup);

        for (let i = 1; i <= linesPerSection; i++) {
            const textInput = document.querySelector(`.custom-text-input[data-section="${section}"][data-line="${i}"]`);
            const fontSelect = document.querySelector(`.font-family-select[data-section="${section}"][data-line="${i}"]`);
            const fontSizeInput = document.querySelector(`.font-size-input[data-section="${section}"][data-line="${i}"]`);
            const boldToggle = document.querySelector(`.text-bold-toggle[data-section="${section}"][data-line="${i}"]`);
            const italicToggle = document.querySelector(`.text-italic-toggle[data-section="${section}"][data-line="${i}"]`);
            const underlineToggle = document.querySelector(`.text-underline-toggle[data-section="${section}"][data-line="${i}"]`);

            // Create the text element
            const textElement = document.createElement("div");
            textElement.classList.add("custom-text");
            textElement.dataset.section = section;
            textElement.dataset.line = i;
            textElement.style.textAlign = "center";
            textElement.style.marginRight = "3.5vh";
            textElement.style.position = "relative";
            textElement.style.marginTop = i === 1 ? "0px" : "10px";

            // Ensure NOT bold by default:
            textElement.style.fontWeight = "normal";

            sectionGroup.appendChild(textElement);

            // Set initial text, font, size
            textElement.textContent = textInput?.value || "";
            textElement.style.fontFamily = fontSelect?.value || "Times New Roman";
            textElement.style.fontSize = `${fontSizeInput?.value || 30}px`;

            // Listeners
            if (textInput) {
                textInput.addEventListener("input", () => {
                    textElement.textContent = textInput.value;
                });
            }
            if (fontSelect) {
                fontSelect.addEventListener("change", () => {
                    textElement.style.fontFamily = fontSelect.value;
                });
            }
            if (fontSizeInput) {
                fontSizeInput.addEventListener("input", () => {
                    textElement.style.fontSize = `${fontSizeInput.value}px`;
                });
            }
            if (boldToggle) {
                boldToggle.addEventListener("change", () => {
                    textElement.style.fontWeight = boldToggle.checked ? "bold" : "normal";
                });
            }
            if (italicToggle) {
                italicToggle.addEventListener("change", () => {
                    textElement.style.fontStyle = italicToggle.checked ? "italic" : "normal";
                });
            }
            if (underlineToggle) {
                underlineToggle.addEventListener("change", () => {
                    textElement.style.textDecoration = underlineToggle.checked ? "underline" : "none";
                });
            }
        }

        // Drag + limit movement
        let isDragging = false;
        let startY = 0;

        sectionGroup.addEventListener("mousedown", e => {
            isDragging = true;
            startY = e.clientY - sectionGroup.offsetTop;
            sectionGroup.classList.add("dragging");
        });

        window.addEventListener("mousemove", e => {
            if (isDragging) {
                const newY = e.clientY - startY;
                const previewBounds = document.querySelector(".dialPreview").getBoundingClientRect();
                const containerHeight = previewBounds.height;

                let minY, maxY;
                if (section === "upper") {
                    minY = 0.15 * containerHeight;
                    maxY = 0.45 * containerHeight;
                } else {
                    minY = 0.45 * containerHeight;
                    maxY = 0.75 * containerHeight;
                }

                const constrainedY = Math.max(minY, Math.min(newY, maxY));
                sectionGroup.style.top = `${constrainedY}px`;
            }
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
            sectionGroup.classList.remove("dragging");
        });
    });
});

// Color handling
document.querySelectorAll(".font-color-select").forEach(select => {
    select.addEventListener("change", (event) => {
        const section = select.dataset.section;
        const line = select.dataset.line;
        const color = event.target.value;
        const textElement = document.querySelector(`.custom-text[data-section="${section}"][data-line="${line}"]`);
        if (textElement) {
            textElement.style.color = color;
        }
    });

    // Initialize option colors
    Array.from(select.options).forEach(option => {
        const color = option.value.toLowerCase();
        option.style.color = color === "#ffffff" ? "#878681" : color;
        option.style.backgroundColor = "transparent";
    });
});

// Displacement handling
document.querySelectorAll(".font-displacement-input").forEach(input => {
    const SCALING_FACTOR = 3;
    input.addEventListener("input", (event) => {
        const section = input.dataset.section;
        const line = parseInt(input.dataset.line, 10);
        const displacement = parseInt(event.target.value, 10) * SCALING_FACTOR;

        const textElement = document.querySelector(`.custom-text[data-section="${section}"][data-line="${line}"]`);
        const previousLine = document.querySelector(`.custom-text[data-section="${section}"][data-line="${line - 1}"]`);

        if (textElement) {
            textElement.style.marginTop = `${10 + displacement}px`;
        }
        if (previousLine) {
            previousLine.style.marginBottom = `${10 + displacement}px`;
        }
    });
});









