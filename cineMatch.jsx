import { useState, useEffect, useRef } from "react";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation", "Documentary", "Fantasy"];
const MOODS = ["🔥 Intense", "😂 Funny", "😭 Emotional", "😱 Scary", "🤔 Thought-provoking", "❤️ Romantic", "🚀 Adventurous", "🧘 Relaxing"];

const POSTER_COLORS = [
  ["#FF6B6B","#4ECDC4"],["#A8EDEA","#FED6E3"],["#FFC371","#FF5F6D"],
  ["#43C6AC","#191654"],["#f7971e","#ffd200"],["#834d9b","#d04ed6"],
  ["#2193b0","#6dd5ed"],["#ee0979","#ff6a00"],["#11998e","#38ef7d"],["#373b44","#4286f4"]
];

function PosterPlaceholder({ title, index }) {
  const [c1, c2] = POSTER_COLORS[index % POSTER_COLORS.length];
  const initials = title.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{
      width:"100%", paddingBottom:"150%", position:"relative", borderRadius:"8px",
      background:`linear-gradient(135deg, ${c1}, ${c2})`,
      display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"
    }}>
      <div style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:"8px"
      }}>
        <span style={{fontSize:"2.5rem", fontWeight:900, color:"rgba(255,255,255,0.9)", letterSpacing:"-1px", fontFamily:"'Playfair Display', serif"}}>{initials}</span>
        <div style={{width:"40px", height:"2px", background:"rgba(255,255,255,0.5)", borderRadius:"2px"}}/>
        <span style={{fontSize:"0.55rem", color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"3px"}}>FILM</span>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div style={{display:"flex", gap:"2px", alignItems:"center"}}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color: i <= Math.round(rating/2) ? "#FFD700" : "#333", fontSize:"0.75rem"}}>★</span>
      ))}
      <span style={{color:"#888", fontSize:"0.7rem", marginLeft:"4px"}}>{rating}/10</span>
    </div>
  );
}

function MovieCard({ movie, index, delay }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        cursor:"pointer", borderRadius:"12px", overflow:"hidden",
        background: hovered ? "#1a1a2e" : "#111",
        border: `1px solid ${hovered ? "#E94560" : "#222"}`,
        boxShadow: hovered ? "0 20px 60px rgba(233,69,96,0.2)" : "0 4px 20px rgba(0,0,0,0.5)",
        transform: visible ? (hovered ? "translateY(-8px) scale(1.02)" : "translateY(0)") : "translateY(30px)",
      }}
    >
      <div style={{position:"relative"}}>
        <PosterPlaceholder title={movie.title} index={index} />
        <div style={{
          position:"absolute", top:"8px", right:"8px",
          background:"rgba(233,69,96,0.9)", color:"#fff",
          fontSize:"0.65rem", fontWeight:700, padding:"3px 8px",
          borderRadius:"20px", letterSpacing:"1px", textTransform:"uppercase"
        }}>{movie.genre}</div>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:"linear-gradient(transparent, rgba(0,0,0,0.95))",
          padding:"30px 12px 12px",
        }}>
          <div style={{color:"#fff", fontWeight:700, fontSize:"0.9rem", fontFamily:"'Playfair Display',serif", lineHeight:1.2}}>{movie.title}</div>
          <div style={{color:"#aaa", fontSize:"0.7rem", marginTop:"2px"}}>{movie.year} · {movie.runtime}</div>
        </div>
      </div>
      <div style={{padding:"12px"}}>
        <StarRating rating={movie.rating} />
        <p style={{color:"#999", fontSize:"0.72rem", lineHeight:1.5, marginTop:"8px", marginBottom:"8px"}}>{movie.description}</p>
        <div style={{display:"flex", gap:"4px", flexWrap:"wrap"}}>
          {movie.tags?.map(tag => (
            <span key={tag} style={{
              background:"#1a1a2e", border:"1px solid #333", color:"#E94560",
              fontSize:"0.6rem", padding:"2px 7px", borderRadius:"20px", fontWeight:600, letterSpacing:"0.5px"
            }}>{tag}</span>
          ))}
        </div>
        {movie.whyRecommended && (
          <div style={{
            marginTop:"10px", padding:"8px 10px",
            background:"rgba(233,69,96,0.08)", borderLeft:"2px solid #E94560",
            borderRadius:"0 6px 6px 0"
          }}>
            <div style={{color:"#E94560", fontSize:"0.6rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"3px"}}>Why you'll love it</div>
            <div style={{color:"#bbb", fontSize:"0.68rem", lineHeight:1.4}}>{movie.whyRecommended}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"20px"}}>
      {[...Array(6)].map((_,i) => (
        <div key={i} style={{
          borderRadius:"12px", overflow:"hidden",
          background:"#111", border:"1px solid #222",
          animation:"pulse 1.5s ease-in-out infinite",
          animationDelay:`${i*0.1}s`
        }}>
          <div style={{paddingBottom:"150%", background:"linear-gradient(135deg,#1a1a2e,#16213e)"}}/>
          <div style={{padding:"12px"}}>
            {[80,60,90,50].map((w,j) => (
              <div key={j} style={{height:"8px", background:"#222", borderRadius:"4px", marginBottom:"8px", width:`${w}%`}}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MovieRecommender() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState("");
  const [yearRange, setYearRange] = useState("any");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [algorithmInfo, setAlgorithmInfo] = useState("");
  const resultsRef = useRef(null);

  const toggleItem = (arr, setArr, item) => {
    setArr(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  };

  const getRecommendations = async () => {
    if (selectedGenres.length === 0 && selectedMoods.length === 0 && !favoriteMovies.trim()) {
      setError("Please select at least one genre, mood, or enter favorite movies.");
      return;
    }
    setError(""); setLoading(true); setHasSearched(true); setMovies([]); setAlgorithmInfo("");

    const prompt = `You are a cinematic AI recommendation engine using collaborative filtering + content-based ML algorithms.

User Preferences:
- Genres: ${selectedGenres.length > 0 ? selectedGenres.join(", ") : "No preference"}
- Moods: ${selectedMoods.length > 0 ? selectedMoods.map(m => m.replace(/^[^\s]+ /, "")).join(", ") : "No preference"}
- Favorite movies: ${favoriteMovies || "Not specified"}
- Era preference: ${yearRange}

Generate 6 highly personalized movie recommendations. Return ONLY valid JSON (no markdown, no extra text):
{
  "algorithm": "2-3 sentence explanation of how you analyzed preferences using content-based filtering, collaborative patterns, and mood matching",
  "movies": [
    {
      "title": "Movie Title",
      "year": "YYYY",
      "genre": "Primary Genre",
      "runtime": "Xh Ym",
      "rating": 8.5,
      "description": "Compelling 2-sentence description",
      "tags": ["tag1", "tag2", "tag3"],
      "whyRecommended": "Specific reason based on user's preferences"
    }
  ]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setMovies(parsed.movies || []);
      setAlgorithmInfo(parsed.algorithm || "");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0f", color:"#fff",
      fontFamily:"'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #E94560; border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* Header */}
      <div style={{
        background:"linear-gradient(180deg,rgba(233,69,96,0.15) 0%,transparent 100%)",
        borderBottom:"1px solid #1a1a2e", padding:"40px 24px 32px", textAlign:"center"
      }}>
        <div style={{maxWidth:"800px", margin:"0 auto"}}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            background:"rgba(233,69,96,0.1)", border:"1px solid rgba(233,69,96,0.3)",
            borderRadius:"20px", padding:"4px 14px", marginBottom:"16px"
          }}>
            <span style={{fontSize:"0.6rem", color:"#E94560", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px"}}>AI-Powered · ML Recommendation Engine</span>
          </div>
          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,5vw,3.5rem)",
            fontWeight:900, lineHeight:1.1, marginBottom:"12px",
            background:"linear-gradient(135deg,#fff 0%,#E94560 60%,#ff8c00 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
          }}>CineMatch AI</h1>
          <p style={{color:"#888", fontSize:"0.95rem", lineHeight:1.6}}>
            Powered by collaborative filtering & content-based ML to surface your next obsession
          </p>
        </div>
      </div>

      <div style={{maxWidth:"900px", margin:"0 auto", padding:"32px 24px"}}>
        {/* Filters */}
        <div style={{
          background:"#0f0f1a", border:"1px solid #1a1a2e", borderRadius:"16px",
          padding:"28px", marginBottom:"24px"
        }}>
          {/* Genres */}
          <div style={{marginBottom:"24px"}}>
            <div style={{color:"#E94560", fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px"}}>
              🎬 Genres <span style={{color:"#555"}}>(select all that apply)</span>
            </div>
            <div style={{display:"flex", flexWrap:"wrap", gap:"8px"}}>
              {GENRES.map(g => (
                <button key={g} onClick={() => toggleItem(selectedGenres, setSelectedGenres, g)} style={{
                  padding:"7px 16px", borderRadius:"20px", border:"1px solid",
                  borderColor: selectedGenres.includes(g) ? "#E94560" : "#222",
                  background: selectedGenres.includes(g) ? "rgba(233,69,96,0.15)" : "transparent",
                  color: selectedGenres.includes(g) ? "#E94560" : "#666",
                  fontSize:"0.78rem", fontWeight:600, cursor:"pointer",
                  transition:"all 0.2s", transform: selectedGenres.includes(g) ? "scale(1.05)" : "scale(1)"
                }}>{g}</button>
              ))}
            </div>
          </div>

          {/* Moods */}
          <div style={{marginBottom:"24px"}}>
            <div style={{color:"#E94560", fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px"}}>
              🎭 Mood
            </div>
            <div style={{display:"flex", flexWrap:"wrap", gap:"8px"}}>
              {MOODS.map(m => (
                <button key={m} onClick={() => toggleItem(selectedMoods, setSelectedMoods, m)} style={{
                  padding:"7px 16px", borderRadius:"20px", border:"1px solid",
                  borderColor: selectedMoods.includes(m) ? "#ff8c00" : "#222",
                  background: selectedMoods.includes(m) ? "rgba(255,140,0,0.12)" : "transparent",
                  color: selectedMoods.includes(m) ? "#ff8c00" : "#666",
                  fontSize:"0.78rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s"
                }}>{m}</button>
              ))}
            </div>
          </div>

          {/* Row: favorites + era */}
          <div style={{display:"grid", gridTemplateColumns:"1fr auto", gap:"16px", alignItems:"end"}}>
            <div>
              <div style={{color:"#E94560", fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"10px"}}>
                ❤️ Favorite Movies <span style={{color:"#555"}}>(improves accuracy)</span>
              </div>
              <input
                value={favoriteMovies}
                onChange={e => setFavoriteMovies(e.target.value)}
                placeholder="e.g. Inception, Parasite, The Godfather..."
                style={{
                  width:"100%", background:"#0a0a0f", border:"1px solid #222",
                  borderRadius:"10px", padding:"11px 16px", color:"#fff",
                  fontSize:"0.85rem", outline:"none", transition:"border-color 0.2s",
                  fontFamily:"inherit"
                }}
                onFocus={e => e.target.style.borderColor="#E94560"}
                onBlur={e => e.target.style.borderColor="#222"}
              />
            </div>
            <div>
              <div style={{color:"#E94560", fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"10px"}}>📅 Era</div>
              <select value={yearRange} onChange={e => setYearRange(e.target.value)} style={{
                background:"#0a0a0f", border:"1px solid #222", borderRadius:"10px",
                padding:"11px 14px", color:"#fff", fontSize:"0.82rem", cursor:"pointer",
                outline:"none", fontFamily:"inherit", minWidth:"130px"
              }}>
                <option value="any">Any Era</option>
                <option value="2020s">2020s</option>
                <option value="2010s">2010s</option>
                <option value="2000s">2000s</option>
                <option value="90s">90s Classics</option>
                <option value="pre-90s">Pre-90s</option>
              </select>
            </div>
          </div>

          {error && <div style={{color:"#E94560", fontSize:"0.8rem", marginTop:"12px", padding:"10px 14px", background:"rgba(233,69,96,0.08)", borderRadius:"8px"}}>{error}</div>}

          <button
            onClick={getRecommendations}
            disabled={loading}
            style={{
              width:"100%", marginTop:"20px", padding:"16px",
              background: loading ? "#1a1a2e" : "linear-gradient(135deg,#E94560,#ff6b35)",
              border:"none", borderRadius:"12px", color:"#fff",
              fontSize:"0.95rem", fontWeight:700, cursor: loading ? "not-allowed" : "pointer",
              letterSpacing:"0.5px", transition:"all 0.3s",
              boxShadow: loading ? "none" : "0 8px 30px rgba(233,69,96,0.35)",
              transform: loading ? "scale(0.99)" : "scale(1)"
            }}
          >
            {loading ? "🎬 Analyzing your taste profile..." : "✨ Get My Recommendations"}
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef}>
          {loading && <LoadingGrid />}

          {!loading && movies.length > 0 && (
            <div>
              {algorithmInfo && (
                <div style={{
                  background:"linear-gradient(135deg,rgba(233,69,96,0.06),rgba(255,107,53,0.06))",
                  border:"1px solid rgba(233,69,96,0.2)", borderRadius:"12px",
                  padding:"16px 20px", marginBottom:"24px",
                  display:"flex", gap:"12px", alignItems:"flex-start"
                }}>
                  <span style={{fontSize:"1.2rem", flexShrink:0, animation:"float 3s ease-in-out infinite"}}>🧠</span>
                  <div>
                    <div style={{color:"#E94560", fontSize:"0.6rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"4px"}}>Algorithm Reasoning</div>
                    <div style={{color:"#aaa", fontSize:"0.78rem", lineHeight:1.6}}>{algorithmInfo}</div>
                  </div>
                </div>
              )}
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px"
              }}>
                <div style={{color:"#fff", fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:700}}>
                  {movies.length} films curated for you
                </div>
                <button onClick={getRecommendations} style={{
                  background:"transparent", border:"1px solid #333", borderRadius:"8px",
                  color:"#888", fontSize:"0.72rem", padding:"6px 14px", cursor:"pointer",
                  fontFamily:"inherit", fontWeight:600, transition:"all 0.2s"
                }}
                  onMouseEnter={e => { e.target.style.borderColor="#E94560"; e.target.style.color="#E94560"; }}
                  onMouseLeave={e => { e.target.style.borderColor="#333"; e.target.style.color="#888"; }}
                >↻ Refresh</button>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"20px"}}>
                {movies.map((m, i) => <MovieCard key={m.title+i} movie={m} index={i} delay={i * 80} />)}
              </div>
            </div>
          )}

          {!loading && !hasSearched && (
            <div style={{textAlign:"center", padding:"48px 24px"}}>
              <div style={{fontSize:"3.5rem", marginBottom:"16px", animation:"float 3s ease-in-out infinite"}}>🎬</div>
              <div style={{color:"#333", fontSize:"0.85rem", lineHeight:1.8}}>
                Select your preferences above<br/>and let the AI find your perfect watch
              </div>
              <div style={{display:"flex", justifyContent:"center", gap:"24px", marginTop:"24px"}}>
                {["Collaborative Filtering","Content-Based ML","Mood Analysis"].map(t => (
                  <div key={t} style={{
                    background:"#0f0f1a", border:"1px solid #1a1a2e", borderRadius:"8px",
                    padding:"10px 16px", color:"#555", fontSize:"0.65rem", fontWeight:600,
                    textTransform:"uppercase", letterSpacing:"1px"
                  }}>{t}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
