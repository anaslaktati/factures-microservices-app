package org.si.billingservice.feign;

import lombok.Getter;
import org.si.billingservice.model.Customer;
import org.si.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "customer-service")
public interface CustomerRestClient {
    @GetMapping("/api/customers/{id}")
    Customer getCustomerById(@PathVariable("id") Long id);

    @GetMapping("/api/customers")
    PagedModel<Customer> getAllCustomers();

}
