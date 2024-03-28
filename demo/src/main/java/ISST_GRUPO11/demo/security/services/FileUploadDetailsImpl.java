package ISST_GRUPO11.demo.security.services;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

public class FileUploadDetailsImpl implements UserDetails {
    private String id;
    private String fileName;
    private String fileType;
    // Other fields and methods as necessary

    // Constructor, getters, and setters

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For file uploads, this might not be applicable
        return null;
    }

    @Override
    public String getPassword() {
        // Not applicable for file uploads
        return null;
    }

    @Override
    public String getUsername() {
        // Could use fileName or another identifier
        return fileName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
