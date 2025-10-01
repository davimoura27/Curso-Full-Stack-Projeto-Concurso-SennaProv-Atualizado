package com.api.senai_sync.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.api.senai_sync.entity.User;
import com.api.senai_sync.repository.UserRepository;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       Optional <User> user = userRepository.findByEmail(email);
       if (user.isEmpty()){
            throw new UsernameNotFoundException("Usuario não encontrado");        
       }
       User userexistent = user.get();
       return org.springframework.security.core.userdetails.User
              .withUsername(userexistent.getEmail())
              .password(userexistent.getPassword())
              .authorities(Collections.emptyList())
              .build();  
    }
}


