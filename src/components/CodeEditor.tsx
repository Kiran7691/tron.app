import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useStore } from '../store';

export const CodeEditor: React.FC = () => {
  const { selectedFile } = useStore();

  const getFileContent = () => {
    const demoContent = {
      'AccountAPITest.java': `package com.banking.api;

import io.restassured.response.Response;
import org.testng.annotations.Test;
import static org.hamcrest.Matchers.*;
import static io.restassured.RestAssured.*;
import com.banking.base.BaseAPI;

public class AccountAPITest extends BaseAPI {
    
    @Test
    public void testGetAccountDetails() {
        Response response = given()
            .spec(requestSpec)
            .pathParam("accountId", "12345")
        .when()
            .get("/api/accounts/{accountId}")
        .then()
            .spec(responseSpec)
            .statusCode(200)
            .body("accountNumber", notNullValue())
            .body("balance", greaterThanOrEqualTo(0.0f))
            .extract().response();
        
        logger.info("Account details retrieved successfully");
    }

    @Test
    public void testCreateNewAccount() {
        String requestBody = "{"
            + "\"customerName\": \"John Doe\","
            + "\"accountType\": \"SAVINGS\","
            + "\"initialDeposit\": 1000.00"
            + "}";

        Response response = given()
            .spec(requestSpec)
            .body(requestBody)
        .when()
            .post("/api/accounts")
        .then()
            .spec(responseSpec)
            .statusCode(201)
            .body("accountId", notNullValue())
            .body("status", equalTo("ACTIVE"))
            .extract().response();

        logger.info("New account created with ID: " + response.path("accountId"));
    }
}`,
      'RestAssuredConfig.java': `package com.banking.utils;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RestAssuredConfig {
    private static final Logger logger = LogManager.getLogger(RestAssuredConfig.class);
    
    public static RequestSpecification getRequestSpec() {
        return new RequestSpecBuilder()
            .setBaseUri(System.getProperty("api.baseUrl"))
            .setContentType("application/json")
            .addHeader("Authorization", "Bearer " + System.getProperty("api.token"))
            .addFilter(new RequestLoggingFilter())
            .addFilter(new ResponseLoggingFilter())
            .build();
    }
    
    public static ResponseSpecification getResponseSpec() {
        return new ResponseSpecBuilder()
            .expectContentType("application/json")
            .build();
    }
}`
    };

    return demoContent[selectedFile as keyof typeof demoContent] || '// Select a file to view its contents';
  };

  return (
    <div className="h-full">
      <div className="p-2 border-b border-gray-800 bg-[#2d2d2d] flex items-center">
        <span className="text-sm text-gray-300">{selectedFile || 'Select a file'}</span>
      </div>
      <div className="overflow-auto h-[calc(100%-2.5rem)]">
        <SyntaxHighlighter
          language={selectedFile?.endsWith('.java') ? 'java' : selectedFile?.endsWith('.xml') ? 'xml' : 'text'}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
          }}
        >
          {getFileContent()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};