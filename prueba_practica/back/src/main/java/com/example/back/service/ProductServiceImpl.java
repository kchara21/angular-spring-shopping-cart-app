package com.example.back.service;

import com.example.back.dto.MessageResponse;
import com.example.back.dto.Product.ProductDTO;
import com.example.back.dto.Product.ProductResponse;
import com.example.back.entities.Product;
import com.example.back.exceptions.ResourceNotFoundException;
import com.example.back.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ProductResponse listAllProducts() {
        List<ProductDTO> content = productRepository.findAll().stream().map(product -> mappingDTO(product)).collect(Collectors.toList());
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(content);
        return productResponse;
    }

    @Override
    public ProductResponse uploadProductsApi() {

        // Cargar todos los valores de la API
        String url = "https://fakestoreapi.com/products";
        RestTemplate restTemplate = new RestTemplate();
        ProductDTO[] productsApi = restTemplate.getForObject(url, ProductDTO[].class);


        for(int i=0; i<productsApi.length;i++){
            Product product = new Product();
            product.setTitle(productsApi[i].getTitle());
            product.setPrice(productsApi[i].getPrice());
            product.setDescription(productsApi[i].getDescription());
            product.setCategory(productsApi[i].getCategory());
            product.setImage(productsApi[i].getImage());
            productRepository.save(product);
        }


      ProductResponse productResponse = new ProductResponse();
      productResponse.setContent(Arrays.stream(productsApi).toList());

        return productResponse;

    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = mappingEntity(productDTO);
        Product newProduct = productRepository.save(product);
       return mappingDTO(newProduct);
    }

    @Override
    public ProductDTO updateProduct(ProductDTO productDTO, long idProduct) {
        Product product = productRepository.findById(idProduct).orElseThrow(() -> new ResourceNotFoundException("Product","id",idProduct));

        product.setTitle(productDTO.getTitle());
        product.setDescription(productDTO.getDescription());
        product.setImage(productDTO.getImage());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        Product productUpdated = productRepository.save(product);
        return mappingDTO(productUpdated);

    }

    @Override
    public MessageResponse deleteProduct(long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product","id",productId));
        productRepository.delete(product);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Product deleted successfully");
        return messageResponse;
    }

    //Convierte de Entidad a DTO
    private ProductDTO mappingDTO(Product product){
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        return productDTO;
    }

    //Convierte de DTO a Entidad
    private Product mappingEntity(ProductDTO productDTO){
        Product product = modelMapper.map(productDTO,Product.class);
        return product;
    }


}
