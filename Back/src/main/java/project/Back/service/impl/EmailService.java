package project.Back.service.impl;
import project.Back.config.MailProperties;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Log4j2
@EnableAsync
public class EmailService{

    private final JavaMailSender emailSender;
    private final MailProperties mailProperties;

    @Async
    public void sendMail(String to, String subject, String body) {
        log.info("Begin sendMail");

        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setText(body, true);
            helper.setSubject(subject);
            helper.setFrom(mailProperties.username());
            emailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new project.Back.exception.MailSenderException(e);
        }
    }
}
