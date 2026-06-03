package org.si.billingservice;

import feign.FeignException;
import feign.Request;
import feign.Response;
import org.junit.jupiter.api.Test;
import org.si.billingservice.feign.CustomerRestClient;
import org.si.billingservice.feign.ProductRestClient;
import org.si.billingservice.repository.BillRepository;
import org.si.billingservice.repository.ProductItemRepository;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BillingServiceApplicationTests {

    @Test
    void commandLineRunnerShouldNotFailWhenFeignServicesAreUnavailable() {
        BillRepository billRepository = mock(BillRepository.class);
        ProductItemRepository productItemRepository = mock(ProductItemRepository.class);
        CustomerRestClient customerRestClient = mock(CustomerRestClient.class);
        ProductRestClient productRestClient = mock(ProductRestClient.class);

        when(customerRestClient.getAllCustomers())
                .thenThrow(feignException(503, "customer-service"));

        BillingServiceApplication application = new BillingServiceApplication();

        assertThatCode(() -> application.commandLineRunner(
                billRepository,
                productItemRepository,
                customerRestClient,
                productRestClient
        ).run()).doesNotThrowAnyException();
    }

    private FeignException feignException(int status, String serviceName) {
        return FeignException.errorStatus(
                "getAllCustomers",
                Response.builder()
                        .status(status)
                        .reason("Service Unavailable")
                        .request(Request.create(Request.HttpMethod.GET, "/api/customers", java.util.Map.of(), null, null, null))
                        .build()
        );
    }
}
