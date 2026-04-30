import SectionHeading from "@/components/SectionHeading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoadingAlumni() {
  // Create an array of 12 placeholders
  const skeletons = Array.from({ length: 12 }, (_, i) => i);

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Data Alumni" 
              subtitle="Direktori Anggota IKSANU (Memuat...)" 
            />
            
            {/* Search Placeholder */}
            <div style={{ 
              marginBottom: "3rem", 
              height: "60px", 
              background: "white", 
              borderRadius: "15px", 
              border: "1px solid var(--gray-100)" 
            }}></div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
              {skeletons.map((i) => (
                <div key={i} style={{ 
                  background: "white", 
                  padding: "1.5rem", 
                  borderRadius: "20px", 
                  border: "1px solid var(--gray-100)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  opacity: 0.6
                }}>
                  {/* Avatar Skeleton */}
                  <div 
                    className="animate-pulse"
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      backgroundColor: "#f3f4f6",
                      flexShrink: 0
                    }}
                  ></div>
                  
                  <div style={{ flex: 1 }}>
                    {/* Name Skeleton */}
                    <div 
                      className="animate-pulse"
                      style={{ 
                        height: "1.2rem", 
                        width: "70%", 
                        backgroundColor: "#f3f4f6", 
                        borderRadius: "4px", 
                        marginBottom: "0.5rem"
                      }}
                    ></div>
                    
                    {/* Info Skeleton */}
                    <div 
                      className="animate-pulse"
                      style={{ 
                        height: "0.8rem", 
                        width: "40%", 
                        backgroundColor: "#f3f4f6", 
                        borderRadius: "4px"
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
