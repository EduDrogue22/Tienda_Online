/* Estas líneas de código declaran variables en JavaScript. Esto es para qué sirve cada variable: */

/* La línea `let API;` declara una variable llamada `API` usando la palabra clave `let` en JavaScript. Este
La variable se está declarando pero no se inicializa con un valor en este momento. es esencialmente
crear un marcador de posición para almacenar datos relacionados con un punto final de API o URL que se recuperará y
utilizado en el código más adelante. */

let API;


/* La línea `let currentPage = 1;` declara una variable llamada `currentPage` usando la palabra clave `let`
en JavaScript. Esta variable se inicializa con el valor `1`. Se utiliza para realizar un seguimiento de la
número de página actual al buscar una lista de productos. En este contexto, sirve como referencia para
el número de página actual para fines de paginación dentro del código. */

let currentPage = 1;

/* La línea `let nextPageUrl = null;` declara una variable llamada `nextPageUrl` usando `let`
palabra clave en JavaScript. Esta variable se está inicializando con el valor "nulo". Sirve como un
marcador de posición para almacenar la URL de la siguiente página de productos que se recuperarán y utilizarán en el
código más adelante. Al inicializarlo con `null`, indica que inicialmente no hay página siguiente
URL asignada al mismo. */

let nextPageUrl = null;


/* La línea `let prevPageUrl = null;` declara una variable llamada `prevPageUrl` usando `let`
palabra clave en JavaScript. Esta variable se está inicializando con el valor "nulo". Sirve como un
marcador de posición para almacenar la URL de la página anterior de productos que se recuperarán y utilizarán en el
código más adelante. Al inicializarlo con `null`, indica que inicialmente no hay página anterior
URL asignada al mismo. Esta variable se utilizará con fines de paginación para navegar a la página anterior.
pagina de productos. */

let prevPageUrl = null;

/**
 * La función `CargarConfig` carga de forma asincrónica un archivo de configuración JSON y 
 * establece la variable API
 * basado en la configuración recuperada.
 */
async function CargarConfig(){
    const response = await fetch('config.json');
    if(!response.ok) {
        throw new alert('No se ha podido cargar la configuración.');
    }
    const config = await response.json();
    API = config.API;
}

/**
 * La función `listaProducts` recupera de forma asincrónica una lista de productos de una URL específica o del
 * Punto final API, manejando errores si ocurren.
 * @param [url=null] - El parámetro `url` en la función `listaProducts` es una cadena que representa
 * la URL de la que se obtendrán los datos del producto. Si no se proporciona ninguna "url", la función utilizará
 * una URL predeterminada construida utilizando la variable `API` y la variable `currentPage`.
 * @returns La función `listaProducts` devuelve una Promesa que se resuelve en los datos JSON obtenidos
 * desde la URL especificada o el punto final API predeterminado con el número de página actual. si la búsqueda
 * la operación es exitosa, la función devuelve los datos JSON. Si hay un error en el servidor
 * respuesta, un error con el mensaje 'Ha ocurrido un error en el servidor.' será arrojado.
 */
async function listaProducts(url = null) {
    if (!API) {
        await CargarConfig();
    }
    const response = await fetch(url || `${API}/productos/?page=${currentPage}`);
    if(!response.ok) {
        throw new alert('Ha ocurrido un error en el servidor.');
    }
    return response.json();
}

/**
 * La función `buscarProducts` recupera de forma asincrónica datos del producto basándose en un parámetro de nombre determinado
 * desde un punto final API después de cargar la configuración.
 * @param name - La función `buscarProducts` es una función asincrónica que toma un `name`
 * parámetro. Esta función primero verifica si la variable `API` está definida y, si no, llama a la
 * Función `CargarConfig` para cargar la configuración. Luego realiza una solicitud de recuperación al punto final de la API.
 *`${
 * @returns La función `buscarProducts` devuelve los datos obtenidos del punto final API
 * `/buscar/?name=` después de verificar si la respuesta fue exitosa. Si la respuesta no es correcta,
 * arroja un mensaje de error 'Ha ocurrido un error en el servidor.'.
 */

async function buscarProducts(name) {
    if (!API) {
        await CargarConfig();
    }
    const response = await fetch(`${API}/buscar/?name=${name}`);
    if(!response.ok) {
        throw new alert('Ha ocurrido un error en el servidor.')
    }
    const data = await response.json();
    return data;
}

/* El fragmento de código que proporcionó utiliza `document.addEventListener('DOMContentLoaded', async
() => { ... })` método para ejecutar operaciones asincrónicas una vez que el contenido DOM ha sido completamente
cargado. Aquí hay un desglose de lo que hace el código dentro de este detector de eventos: */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await listaProducts();
        mostrarProductos(data);
        actualizarPaginacion(data.count, data.next, data.previous);

    } catch {
        alert('A ocurrido un error.');
    }

    document.getElementById('form-buscar').addEventListener('submit', async (event) => {
        event.preventDefault();
        const buscarInput = document.getElementById('input-buscar').value;
        try {
            const data = await buscarProducts(buscarInput);
            mostrarProductos(data);
            actualizarPaginacion(data.count, data.next, data.previous);
        } catch {
            alert('Ha ocurrido un error al buscar el producto.');
        }
    });
});

/**
 * La función `mostrarProductos` muestra una lista de productos en una página web en función de los datos proporcionados,
 * manejo de casos donde no hay productos o la estructura de datos es incorrecta.
 * @param data - La función `mostrarProductos` está diseñada para mostrar una lista de productos en una web
 *página basada en los datos proporcionados. La función primero verifica si hay algún resultado en los datos. Si
 * no hay resultados, muestra un mensaje indicando que no hay productos disponibles
 */
function mostrarProductos(data) {
    const productLista = document.getElementById('product-lista');
    productLista.innerHTML = '';

    if (!data.results || data.results.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.className = 'mt-5';
        noResultsMessage.textContent = 'No hay producto disponible.';
        productLista.appendChild(noResultsMessage);
    } else {
        if (data.results.length > 0 && !Array.isArray(data.results[0].products)) {
            const row = document.createElement('div');
            row.className = 'row mx-5 my-5';
            data.results.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-6 col-12 col-lg-3';

                const cardHtml = `
                    <div class="mt-5 justify-content-between card" style="width: 18rem;">
                        <img src="${product.url_image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Precio: $${product.price}</p>
                            <p class="card-text">Descuento: ${product.discount}%</p>
                            <p class="card-text">Categoria: ${product.category_name}</p>
                        </div>
                    </div>
                `;

                productCard.innerHTML = cardHtml;
                row.appendChild(productCard);
            });
            productLista.appendChild(row);
        } else {
            data.results.forEach(category => {
                if (Array.isArray(category.products)) {
                    const row = document.createElement('div');
                    row.className = 'row mx-5 my-5';
                    category.products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'col-md-6 col-12 col-lg-3';

                        const cardHtml = `
                            <div class="mt-5 justify-content-between card" style="width: 18rem;">
                                <img src="${product.url_image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">Precio: $${product.price}</p>
                                    <p class="card-text">Descuento: ${product.discount}%</p>
                                    <p class="card-text">Categoria: ${product.category_name}</p>
                                </div>
                            </div>
                        `;

                        productCard.innerHTML = cardHtml;
                        row.appendChild(productCard);
                    });
                    productLista.appendChild(row);
                } else {
                    alert("Ha ocurrido un error en la lista de productos.")
                }
            });
        }
    }
}

/**
 * La función `actualizarPaginacion` actualiza los elementos de paginación según el total de elementos y la navegación.
 * URL, que permiten a los usuarios navegar entre páginas.
 * @param totalItems - La función `actualizarPaginacion` que proporcionaste parece estar actualizando la paginación
 * elementos basados ​​en el número total de elementos y las URL de las páginas anterior y siguiente. También
 * incluye detectores de eventos para navegar entre páginas.
 * @param next - El parámetro `next` en la función `actualizarPaginacion` se utiliza para determinar el
 * URL para la siguiente página de elementos en una lista paginada. Cuando el usuario hace clic en "Siguiente" (Siguiente)
 * botón en la interfaz de usuario de paginación, la función buscará los datos para el
 * @param anterior - El parámetro `anterior` en la función `actualizarPaginacion` se usa para almacenar
 * la URL de la página anterior de elementos en una lista paginada. Esta URL se utiliza luego para buscar el
 * página anterior de elementos cuando el usuario hace clic en el botón "Anterior" (Anterior).
 */
function actualizarPaginacion(totalItems, next, previous) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    nextPageUrl = next;
    prevPageUrl = previous;

    const prevPageItem = document.createElement('li');
    prevPageItem.className = 'page-item' + (prevPageUrl ? '' : ' disabled');
    prevPageItem.innerHTML = `
        <a class="page-link" href="#" aria-label="Previous" id="prevPage">
            <span aria-hidden="true">Anterior</span>
        </a>
    `;
    pagination.appendChild(prevPageItem);

    const nextPageItem = document.createElement('li');
    nextPageItem.className = 'page-item' + (nextPageUrl ? '' : ' disabled');
    nextPageItem.innerHTML = `
        <a class="page-link" href="#" aria-label="Next" id="nextPage">
            <span aria-hidden="true">Siguiente</span>
        </a>
    `;
    pagination.appendChild(nextPageItem);

    document.getElementById('prevPage').addEventListener('click', async (event) => {
        event.preventDefault();
        if (prevPageUrl) {
            currentPage--;
            try {
                const data = await listaProducts(prevPageUrl);
                mostrarProductos(data);
                actualizarPaginacion(data.count, data.next, data.previous);
            } catch {
                alert('Ha ocurrido un error al regresar la página anterior.');
            }
        }
    });

    document.getElementById('nextPage').addEventListener('click', async (event) => {
        event.preventDefault();
        if (nextPageUrl) {
            currentPage++;
            try {
                const data = await listaProducts(nextPageUrl);
                mostrarProductos(data);
                actualizarPaginacion(data.count, data.next, data.previous);
            } catch {
                alert('Ha ocurrido un error en la siguiente página.');
            }
        }
    });
}

/* El código JavaScript anterior agrega un detector de eventos al elemento con la identificación 'home-link'. Cuando
Se hace clic en el elemento, el código impide la acción predeterminada (en este caso, seguir el enlace) y
luego recarga la página actual usando `window.location.reload()`. */
document.getElementById('home-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.reload();
});