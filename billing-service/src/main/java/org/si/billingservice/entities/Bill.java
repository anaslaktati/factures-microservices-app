package org.si.billingservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.si.billingservice.model.Customer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date billingDate;
    private long customerId;
    @OneToMany(mappedBy = "bill", fetch = FetchType.EAGER)
    private Collection<ProductItem> productItems;
    @Transient private Customer customer;
}
