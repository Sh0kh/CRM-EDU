import Swal from "sweetalert2";

(function addGlobalStyles() {
    if (!document.getElementById("swal-global-styles")) {
        const styleElement = document.createElement("style");
        styleElement.id = "swal-global-styles";
        styleElement.textContent = `
            .swal2-container {
                z-index: 99999 !important;
            }

            .swal2-popup {
                z-index: 99999 !important;
                background: #ffffff !important;
                border-radius: 12px !important;
                padding: 12px 20px !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            }

            .swal2-title {
                color: #000 !important;
                font-size: 16px !important;
                font-weight: 600 !important;
            }

            .swal2-icon {
                margin-top: 5px !important;
                margin-bottom: 5px !important;
            }

            .swal2-toast {
                border: 1px solid #e5e5e5 !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
})();

export const Alert = (message, iconType) => {
    Swal.fire({
        title: message,
        icon: iconType,
        position: "top", // ⬅ Центр сверху
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
        background: "#ffffff",
        color: "#000000"
    });
};

export const commonAlert = (message, iconType) => {
    Swal.fire({
        title: message,
        icon: iconType,
        draggable: true,
        background: "#ffffff",
        color: "#000000"
    });
};
