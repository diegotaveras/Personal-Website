package com.example.springbootserverless;

import java.util.Objects;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;


public class DynamoClient {
    AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion("us-east-1").build();
    DynamoDB dynamoDb = new DynamoDB(client);

    Table table = dynamoDb.getTable("AuthTokens");


    public Item GetToken(String user_id) {  

        try {
            GetItemSpec spec = new GetItemSpec().withPrimaryKey("user_id", user_id);

            Item outcome = table.getItem(spec);
            if (Objects.nonNull(outcome)) {
                System.out.println("SUCCESS");
                return outcome;
            } else {
                System.out.println("FAILURE");

            }
        } catch (Exception e) {
            System.out.println("DynamboDB exception" + e);
        }
        Item outcome = table.getItem();

        return outcome;
    }
    public PutItemOutcome PutToken(String user_id, String token) {

        try {
            PutItemOutcome outcome = table.putItem(new Item().withPrimaryKey("user_id", user_id).with("token", token));
            if (Objects.nonNull(outcome)) {
                System.out.println("SUCCESS");
                return outcome;
            } else {
                System.out.println("FAILURE");
                return outcome;

            }
        } catch (Exception e) {
            System.out.println("DynamboDB exception" + e);
        }
        return table.putItem(new Item());
    }
    
}
