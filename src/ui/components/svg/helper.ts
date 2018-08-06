export default function svg(params) {
    return `<object type="image/svg+xml" data="${params}.svg">Your browser does not support SVG</object>`;
}
