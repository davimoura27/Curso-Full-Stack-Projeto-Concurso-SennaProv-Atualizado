package com.api.senai_sync.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConcursoService {

    public List<Map<String, String>> fetchConcursosByUf(String uf) {
        List<Map<String, String>> concursos = new ArrayList<>();

        try {
            Document doc = Jsoup.connect("https://www.concursosnobrasil.com/concursos/" + uf).get();
            Elements rows = doc.select("tr");

            for (Element row : rows) {
                Element link = row.selectFirst("a[href]");
                if (link != null) {
                    Map<String, String> concursoData = new HashMap<>();
                    concursoData.put("name", link.text());
                    concursoData.put("link", link.absUrl("href"));
                    concursos.add(concursoData);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return concursos;
    }
}
