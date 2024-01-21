import { createContext , useReducer,  useEffect } from 'react';
import { endpointHost } from '../../variables/endpoint';
export const initialState= {
                           
                           category:[],
                          productos:[],
                         
                          }
export const AdmiContext = createContext();


export const AdmiContextProvider = ({children}) => {




  const fetchProducts = () => {
    fetch(`${endpointHost}/products/list`)
      .then((response) => response.json())
      .then((productos) => {
       
       
       
        dispatch({ type: 'load_product', productos });
       // console.log(...productos)
saveProductsToStorage(productos)
//saveProductsToStorage(nuevosProductos)
       // console.log(productos)
     
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };






const getProductsFromStorage = () => {
  const localData = localStorage.getItem("productos");
 /* const productos = localData ? JSON.parse(localData) : [];
  console.log("Productos almacenados en localStorage:", productos);*/
  return localData ? JSON.parse(localData) : [];
};


const saveProductsToStorage = (productos) => {
  localStorage.setItem("productos", JSON.stringify(productos));
};




const getCategoryFromStorage = () => {


 
  const localData = localStorage.getItem("category");
  //console.log(localData)
  return localData ? JSON.parse(localData) : [];
};




const saveCategoryToStorage = (category) => {
 
  localStorage.setItem("category", JSON.stringify(category));
 
};




















// Creo el reducer
const reducer = (state, action) => {
  switch (action.type) {




    case "add_product":{


       
      const nuevosProductos = [...state.productos, action.productos];
      saveProductsToStorage(nuevosProductos);


     
     
      return {...state, productos: nuevosProductos};
     
    }
       
     
   
        case 'load_product': {


          //fetchProducts();


         /* fetch(`${endpointHost}/products/list`)
          .then((response) => response.json())
          .then((productos) => {
       
           
           
          dispatch({ type: 'load_product', productos});
          //
            saveProductsToStorage(productos)  
         
          })
          .catch((error) => {
            console.error('Error:', error);
          });
   
    */
   


            return { ...state, productos:getProductsFromStorage() };
        }

      case "update_product": {
        fetchProducts();
      }

    case "delete_product":{
      const nuevosProductos = state.productos.filter( (productos) => productos.game_id !== action.productos.game_id);
      console.log(nuevosProductos)


      saveProductsToStorage(nuevosProductos);
     
     //saveProductsToStorage(state.productos);
      return {...state , productos: nuevosProductos};
    }






    case 'load_category': {








     /*  fetch(`${endpointHost}/categories/list`)
          .then((response) => response.json())
          .then((category) => {
       
            //console.log(...category)
           
          dispatch({ type: 'load_category', category});
          //
            saveCategoryToStorage(category)  
         
          })
          .catch((error) => {
            console.error('Error:', error);
          });


*/






      return { ...state, category:getCategoryFromStorage() };
  }


    case "add_category" : {
     const  nuevasCategorias = [...state.category , action.category]
     
      saveCategoryToStorage(nuevasCategorias)
     
     
      return{...state , category: nuevasCategorias};
     
    }










  default:
        return state;
    }
};
/*


const fetchImagenes = () => {
  fetch(`${endpointHost}/product/images/${game_id}/all`)
      .then((response) => response.json())
      .then((imagenes) => {
        dispatch({ type: 'load_imagenes', imagenes });


        saveImagesToStorage(imagenes)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};


*/




/*
const fetchImagenes = (game_id) => {


  const producto = state.productos.find((producto) => producto.game_id === game_id );
  console.log(producto)
  if (!producto) {
    console.error('No se encontró el producto con el game_id especificado');
    return;
  }






  fetch(`${endpointHost}/product/images/${game_id}/all`)
      .then((response) => response.json())
      .then((imagenes) => {
        dispatch({ type: 'load_imagenes', imagenes });
        const saveImagesToStorage = (imagen) => {


          localStorage.setItem("file", JSON.stringify(imagen));
         
        };
        saveImagesToStorage(imagenes)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};


*/


// Creo el contexto y lo guardo en el AdmiContext


  const [state, dispatch] = useReducer(reducer, initialState);
 




 
 










  const fetchCategory = () =>{
    fetch(`${endpointHost}/categories/list`)
    .then((response) => response.json())
   
        .then((category) => {
         
          //console.log(...category)
         //
          //saveCategoryToStorage(category)
        dispatch({ type: 'load_category', category});
        //
          saveCategoryToStorage(category)  
        //dispatch({ type: 'load_category', category});
          //console.log(category)
        //saveCategoryToStorage(category)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }




















 
  useEffect(() => {
   
    fetchProducts();
    fetchCategory();
//fetchImagenes()
 //dispatch({type: "load_product"})
 //dispatch({type: "load_category"})
 //dispatch({type:"load_imagenes"})


  }, []);


  return (
    <AdmiContext.Provider value={{ state, dispatch  }}>
      {children}
    </AdmiContext.Provider>
  );
};


export default AdmiContextProvider;


