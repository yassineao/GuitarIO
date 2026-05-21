package org.authentification;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = {
                "JWT_SECRET=01234567890123456789012345678901",
                "spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DB_CLOSE_DELAY=-1",
                "spring.datasource.driverClassName=org.h2.Driver",
                "spring.datasource.username=sa",
                "spring.datasource.password=",
                "spring.jpa.hibernate.ddl-auto=create-drop",
                "spring.jpa.show-sql=false",
                "spring.sql.init.mode=never",
                "spring.ai.google.genai.api-key=test-api-key",
                "spring.ai.google.genai.embedding.api-key=test-api-key",
                "server.port=0"
        }
)
class ApplicationStartupTest {

    @Test
    void applicationStarts() {
    }
}
