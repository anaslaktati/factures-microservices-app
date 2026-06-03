package org.si.billingservice.web;

import org.si.billingservice.entities.Bill;
import org.si.billingservice.feign.CustomerRestClient;
import org.si.billingservice.feign.ProductRestClient;
import org.si.billingservice.repository.BillRepository;
import org.si.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class BillRestController {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductItemRepository productItemRepository;
    @Autowired
    private CustomerRestClient customerRestClient;
    @Autowired
    private ProductRestClient productRestClient;

    @GetMapping(path = {"/bills/{id}", "/api/bills/{id}"})
    public Bill getBill(@PathVariable Long id){
        Bill bill = billRepository.findById(id).get();
        bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(pi -> {
            pi.setProduct(productRestClient.getProductById(pi.getProductId()));
        });
        return bill;
    }

}
