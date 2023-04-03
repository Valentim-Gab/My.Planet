package site.my.planet.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final UserDetailServiceCustom userDetail;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public JWTFilter jwtFilter() {
        return new JWTFilter();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public WebSecurity(UserDetailServiceCustom userDetail) {
        this.userDetail = userDetail;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetail).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeHttpRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/user").permitAll()
                .antMatchers(HttpMethod.GET, "/user/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/user/img/{imgName}").permitAll()
                .antMatchers(HttpMethod.POST, "/user").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PATCH, "/user/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/user/{id}").hasAnyAuthority("u", "a")
                //
                .antMatchers(HttpMethod.GET, "/media").permitAll()
                .antMatchers(HttpMethod.GET, "/media/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/media/personal-work/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/media/img/{imgName}").permitAll()
                .antMatchers(HttpMethod.POST, "/media").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PUT, "/media/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/media/{id}").hasAnyAuthority("u", "a")
                //
                .antMatchers(HttpMethod.GET, "/personal-work").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.GET, "/personal-work/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/personal-work/user/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.GET, "/personal-work/user/public/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/personal-work/img/{imgName}").permitAll()
                .antMatchers(HttpMethod.POST, "/personal-work").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PUT, "/personal-work/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PATCH, "/personal-work/public/visibility").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/personal-work/{id}").hasAnyAuthority("u", "a")
                //
                .antMatchers(HttpMethod.GET, "/commentary").permitAll()
                .antMatchers(HttpMethod.GET, "/commentary/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/commentary/work/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/commentary").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.PUT, "/commentary/{id}").hasAnyAuthority("u", "a")
                .antMatchers(HttpMethod.DELETE, "/commentary/{id}").hasAnyAuthority("u", "a")
                //
                .anyRequest().authenticated()
                .and()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(this.jwtFilter(),
                UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(
                Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"));
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
