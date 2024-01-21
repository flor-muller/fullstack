package project.Back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public record MailProperties(@Value("${spring.mail.host}") String host,
                             @Value("${spring.mail.port}") Integer port,
                             @Value("${spring.mail.username}") String username,
                             @Value("${spring.mail.password}") String password,
                             @Value("${spring.mail.properties.mail.smtp.auth}") String auth,
                             @Value("${spring.mail.properties.mail.smtp.starttls.enable}") String starttls,
                             @Value("${spring.mail.properties.mail.transport.protocol}") String protocol,
                             @Value("${spring.mail.properties.mail.debug}") String debug) {
}

