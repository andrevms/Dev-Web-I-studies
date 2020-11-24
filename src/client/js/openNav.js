

const openNav = async(e) => {
    document.getElementById("menu").style.width = "100%";
};

const closeNav = async(e) => {
    document.getElementById("menu").style.width = null;
};

export {
    openNav, closeNav
}