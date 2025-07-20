import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export class PDFService {
    async generatePDF(budgetData, calculationResult) {
        const pdf = new jsPDF('p', 'mm', 'a4');
        try {
            // Create and render Page 1
            const page1 = this.createPage1(budgetData, calculationResult);
            await this.renderPageToPDF(pdf, page1, false);
            // Create and render Page 2 (only if AI content exists)
            if (this.hasAIContent(calculationResult)) {
                const page2 = this.createPage2(budgetData, calculationResult);
                await this.renderPageToPDF(pdf, page2, true);
            }
            // Save the PDF
            const fileName = `Hochzeitsbudget_${budgetData.partner1Name}_${budgetData.partner2Name}_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
        }
        catch (error) {
            console.error('PDF generation failed:', error);
            throw error;
        }
    }
    async renderPageToPDF(pdf, pageElement, addNewPage) {
        document.body.appendChild(pageElement);
        try {
            // Convert page to canvas
            const canvas = await html2canvas(pageElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 794,
                height: 1123,
                logging: false
            });
            if (addNewPage) {
                pdf.addPage();
            }
            // Calculate dimensions to fit A4
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            // Add image to PDF - ensure it fits on one page
            const imgData = canvas.toDataURL('image/png', 1.0);
            const maxHeight = 297; // A4 height in mm
            if (imgHeight > maxHeight) {
                // Scale down to fit
                const scaleFactor = maxHeight / imgHeight;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scaleFactor, maxHeight);
            }
            else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
        }
        finally {
            // Clean up
            document.body.removeChild(pageElement);
        }
    }
    hasAIContent(calculationResult) {
        return (calculationResult.recommendations.length > 0 ||
            calculationResult.savingTips.length > 0 ||
            calculationResult.personalizedAdvice?.length > 0 ||
            calculationResult.riskAnalysis?.length > 0);
    }
    createPage1(budgetData, calculationResult) {
        const container = document.createElement('div');
        container.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 794px;
      height: 1123px;
      background: linear-gradient(135deg, #f8f6f3 0%, #f1ede6 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2d2d2d;
      padding: 30px;
      box-sizing: border-box;
      overflow: hidden;
    `;
        const efficiencyIcon = this.getEfficiencyIcon(calculationResult.budgetEfficiency);
        const efficiencyText = this.getEfficiencyText(calculationResult.budgetEfficiency);
        const efficiencyColor = this.getEfficiencyColor(calculationResult.budgetEfficiency);
        container.innerHTML = `
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #6B46C1;">
        <div style="
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #6B46C1, #8B5CF6, #8B5A3C);
          border-radius: 14px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(107, 70, 193, 0.3);
        ">
          <span style="color: white; font-size: 20px;">💝</span>
        </div>
        <h1 style="
          font-size: 32px;
          font-weight: 700;
          color: #6B46C1;
          margin: 0 0 5px 0;
          font-family: 'Georgia', serif;
        ">Hochzeitsbudget</h1>
        <h2 style="
          font-size: 18px;
          color: #8B5A3C;
          margin: 0 0 10px 0;
          font-weight: 300;
        ">${budgetData.partner1Name} & ${budgetData.partner2Name}</h2>
        <div style="
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 11px;
          color: #8B5A3C;
          font-weight: 500;
          flex-wrap: wrap;
        ">
          <span>📅 ${budgetData.weddingDate}</span>
          <span>•</span>
          <span style="text-transform: capitalize;">${budgetData.weddingStyle} Stil</span>
          <span>•</span>
          <span style="text-transform: capitalize;">${budgetData.venueType}</span>
        </div>
      </div>

      <!-- Summary Cards -->
      <div style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 25px;
      ">
        ${this.createSummaryCard('💰', '€' + budgetData.totalBudget.toLocaleString('de-DE'), 'Gesamtbudget', '#6B46C1')}
        ${this.createSummaryCard('👥', budgetData.guestCount.toString(), 'Gäste', '#8B5CF6')}
        ${this.createSummaryCard('🎯', '€' + Math.round(calculationResult.pricePerGuest).toLocaleString('de-DE'), 'Pro Gast', '#8B5A3C')}
        ${this.createSummaryCard(efficiencyIcon, efficiencyText, 'Budget-Effizienz', efficiencyColor)}
      </div>

      <!-- Budget Breakdown -->
      <div style="margin-bottom: 25px;">
        <h3 style="
          font-size: 18px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 12px;
          font-family: 'Georgia', serif;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <div style="
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #6B46C1, #8B5CF6);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="color: white; font-size: 12px;">📊</span>
          </div>
          Detaillierte Aufteilung
        </h3>
        <div style="
          background: rgba(255, 255, 255, 0.8);
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(107, 70, 193, 0.1);
        ">
          ${calculationResult.categories.map((category, index) => `
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 0;
              ${index < calculationResult.categories.length - 1 ? 'border-bottom: 1px solid rgba(107, 70, 193, 0.1);' : ''}
            ">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: ${this.getCategoryColor(index)};
                "></div>
                <div>
                  <div style="
                    font-weight: 600;
                    color: #2d2d2d;
                    font-size: 12px;
                  ">${category.icon} ${category.name}</div>
                  <div style="
                    font-size: 10px;
                    color: #8B5A3C;
                    margin-top: 1px;
                  ">${category.description}</div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="
                  font-weight: 700;
                  color: #6B46C1;
                  font-size: 14px;
                ">€${category.amount.toLocaleString('de-DE')}</div>
                <div style="
                  font-size: 10px;
                  color: #8B5A3C;
                  font-weight: 500;
                ">${category.percentage}%</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${this.hasAIContent(calculationResult) ? `
        <!-- AI Preview Section -->
        <div style="margin-bottom: 20px;">
          <h3 style="
            font-size: 16px;
            font-weight: 600;
            color: #2d2d2d;
            margin-bottom: 10px;
            font-family: 'Georgia', serif;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <div style="
              width: 24px;
              height: 24px;
              background: linear-gradient(135deg, #6B46C1, #8B5CF6);
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="color: white; font-size: 10px;">🤖</span>
            </div>
            KI-Empfehlungen (Auswahl)
          </h3>
          <div style="
            background: rgba(255, 255, 255, 0.8);
            border-radius: 12px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(107, 70, 193, 0.1);
          ">
            ${calculationResult.recommendations.slice(0, 2).map(rec => `
              <div style="
                display: flex;
                align-items: flex-start;
                gap: 6px;
                margin-bottom: 8px;
                font-size: 10px;
                line-height: 1.3;
              ">
                <span style="color: #6B46C1; margin-top: 1px; font-size: 8px;">💝</span>
                <span style="color: #2d2d2d;">${this.cleanText(rec).substring(0, 80)}...</span>
              </div>
            `).join('')}
            <div style="
              text-align: center;
              margin-top: 8px;
              padding: 4px 8px;
              background: rgba(107, 70, 193, 0.1);
              border-radius: 8px;
              font-size: 9px;
              color: #6B46C1;
              font-weight: 500;
            ">
              Vollständige KI-Analyse auf Seite 2
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 20px;
        left: 30px;
        right: 30px;
        text-align: center;
        padding-top: 10px;
        border-top: 1px solid #6B46C1;
        color: #8B5A3C;
        font-size: 10px;
      ">
        <div style="font-weight: 600; margin-bottom: 2px;">
          Erstellt mit Wilma Hochzeitsbudget-Planer
        </div>
        <div>
          Erstellt am: ${new Date().toLocaleDateString('de-DE')} • Seite 1 ${this.hasAIContent(calculationResult) ? 'von 2' : ''}
        </div>
      </div>
    `;
        return container;
    }
    createPage2(budgetData, calculationResult) {
        const container = document.createElement('div');
        container.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 794px;
      height: 1123px;
      background: linear-gradient(135deg, #f8f6f3 0%, #f1ede6 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2d2d2d;
      padding: 30px;
      box-sizing: border-box;
      overflow: hidden;
    `;
        container.innerHTML = `
      <!-- Page Header -->
      <div style="text-align: center; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #6B46C1;">
        <h2 style="
          font-size: 20px;
          font-weight: 600;
          color: #6B46C1;
          margin: 0;
          font-family: 'Georgia', serif;
        ">KI-Empfehlungen & Ratschläge</h2>
        <p style="
          font-size: 12px;
          color: #8B5A3C;
          margin: 6px 0 0 0;
        ">${budgetData.partner1Name} & ${budgetData.partner2Name}</p>
      </div>

      <!-- Main Content Grid -->
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 20px;
      ">
        <!-- Recommendations -->
        ${calculationResult.recommendations.length > 0 ? `
          <div>
            <h3 style="
              font-size: 14px;
              font-weight: 600;
              color: #2d2d2d;
              margin-bottom: 8px;
              font-family: 'Georgia', serif;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <div style="
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #6B46C1, #8B5CF6);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: white; font-size: 10px;">✨</span>
              </div>
              Empfehlungen
            </h3>
            <div style="
              background: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              padding: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              border: 1px solid rgba(107, 70, 193, 0.1);
              height: 140px;
              overflow-y: auto;
            ">
              ${calculationResult.recommendations.map(rec => `
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 4px;
                  margin-bottom: 8px;
                  font-size: 10px;
                  line-height: 1.3;
                ">
                  <span style="color: #6B46C1; margin-top: 1px; font-size: 8px;">💝</span>
                  <span style="color: #2d2d2d;">${this.cleanText(rec)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '<div></div>'}

        <!-- Saving Tips -->
        ${calculationResult.savingTips.length > 0 ? `
          <div>
            <h3 style="
              font-size: 14px;
              font-weight: 600;
              color: #2d2d2d;
              margin-bottom: 8px;
              font-family: 'Georgia', serif;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <div style="
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #10B981, #059669);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: white; font-size: 10px;">⭐</span>
              </div>
              Spartipps
            </h3>
            <div style="
              background: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              padding: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              border: 1px solid rgba(16, 185, 129, 0.1);
              height: 140px;
              overflow-y: auto;
            ">
              ${calculationResult.savingTips.map(tip => `
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 4px;
                  margin-bottom: 8px;
                  font-size: 10px;
                  line-height: 1.3;
                ">
                  <span style="color: #10B981; margin-top: 1px; font-size: 8px;">💎</span>
                  <span style="color: #2d2d2d;">${this.cleanText(tip)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '<div></div>'}

        <!-- Personalized Advice -->
        ${calculationResult.personalizedAdvice?.length > 0 ? `
          <div>
            <h3 style="
              font-size: 14px;
              font-weight: 600;
              color: #2d2d2d;
              margin-bottom: 8px;
              font-family: 'Georgia', serif;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <div style="
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #8B5A3C, #A16F47);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: white; font-size: 10px;">👥</span>
              </div>
              Persönliche Ratschläge
            </h3>
            <div style="
              background: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              padding: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              border: 1px solid rgba(139, 90, 60, 0.1);
              height: 140px;
              overflow-y: auto;
            ">
              ${calculationResult.personalizedAdvice.map(advice => `
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 4px;
                  margin-bottom: 8px;
                  font-size: 10px;
                  line-height: 1.3;
                ">
                  <span style="color: #8B5A3C; margin-top: 1px; font-size: 8px;">🌸</span>
                  <span style="color: #2d2d2d;">${this.cleanText(advice)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '<div></div>'}

        <!-- Risk Analysis -->
        ${calculationResult.riskAnalysis?.length > 0 ? `
          <div>
            <h3 style="
              font-size: 14px;
              font-weight: 600;
              color: #2d2d2d;
              margin-bottom: 8px;
              font-family: 'Georgia', serif;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <div style="
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #F59E0B, #D97706);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: white; font-size: 10px;">⚠️</span>
              </div>
              Risikoanalyse
            </h3>
            <div style="
              background: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              padding: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              border: 1px solid rgba(245, 158, 11, 0.1);
              border-left: 2px solid #F59E0B;
              height: 140px;
              overflow-y: auto;
            ">
              ${calculationResult.riskAnalysis.map(risk => `
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 4px;
                  margin-bottom: 8px;
                  font-size: 10px;
                  line-height: 1.3;
                ">
                  <span style="color: #F59E0B; margin-top: 1px; font-size: 8px;">⚠️</span>
                  <span style="color: #2d2d2d;">${this.cleanText(risk)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '<div></div>'}
      </div>

      <!-- Bottom Summary -->
      <div style="
        background: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(107, 70, 193, 0.2);
        margin-top: 20px;
      ">
        <div style="text-align: center;">
          <h4 style="
            font-size: 14px;
            font-weight: 600;
            color: #6B46C1;
            margin: 0 0 8px 0;
            font-family: 'Georgia', serif;
          ">🎯 Zusammenfassung Ihrer Hochzeitsplanung</h4>
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
            font-size: 10px;
            text-align: center;
          ">
            <div>
              <div style="font-weight: 600; color: #2d2d2d;">Budget</div>
              <div style="color: #6B46C1;">€${budgetData.totalBudget.toLocaleString('de-DE')}</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #2d2d2d;">Stil</div>
              <div style="color: #8B5A3C; text-transform: capitalize;">${budgetData.weddingStyle}</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #2d2d2d;">Effizienz</div>
              <div style="color: ${this.getEfficiencyColor(calculationResult.budgetEfficiency)};">
                ${this.getEfficiencyText(calculationResult.budgetEfficiency)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 20px;
        left: 30px;
        right: 30px;
        text-align: center;
        padding-top: 10px;
        border-top: 1px solid #6B46C1;
        color: #8B5A3C;
        font-size: 10px;
      ">
        <div style="font-weight: 600; margin-bottom: 2px;">
          Erstellt mit Wilma Hochzeitsbudget-Planer
        </div>
        <div>
          Erstellt am: ${new Date().toLocaleDateString('de-DE')} • Seite 2 von 2
        </div>
      </div>
    `;
        return container;
    }
    createSummaryCard(icon, value, label, color) {
        return `
      <div style="
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(107, 70, 193, 0.1);
      ">
        <div style="
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, ${color}, ${color}95);
          border-radius: 8px;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="color: white; font-size: 14px;">${icon}</span>
        </div>
        <div style="
          font-size: 16px;
          font-weight: 700;
          color: ${color};
          margin-bottom: 2px;
          line-height: 1.2;
        ">${value}</div>
        <div style="
          font-size: 9px;
          color: #8B5A3C;
          font-weight: 500;
        ">${label}</div>
      </div>
    `;
    }
    getCategoryColor(index) {
        const colors = [
            '#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE',
            '#5B21B6', '#7C3AED', '#8B5A3C', '#A16F47'
        ];
        return colors[index % colors.length];
    }
    getEfficiencyIcon(efficiency) {
        switch (efficiency) {
            case 'high': return '💝';
            case 'medium': return '✨';
            case 'low': return '👑';
            default: return '⭐';
        }
    }
    getEfficiencyText(efficiency) {
        switch (efficiency) {
            case 'high': return 'Sehr effizient';
            case 'medium': return 'Durchschnittlich';
            case 'low': return 'Luxuriös';
            default: return 'Unbekannt';
        }
    }
    getEfficiencyColor(efficiency) {
        switch (efficiency) {
            case 'high': return '#10B981';
            case 'medium': return '#F59E0B';
            case 'low': return '#6B46C1';
            default: return '#6B5B73';
        }
    }
    cleanText(text) {
        // Remove emojis and special characters for PDF
        return text.replace(/[^\w\s\-äöüÄÖÜß.,!?()]/g, '').trim();
    }
}
export const pdfService = new PDFService();
