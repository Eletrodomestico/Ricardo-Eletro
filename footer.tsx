export function Footer() {
  return (
    <footer className="bg-red-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Sua Conta</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Meus Pedidos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Meus Dados
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lista de Desejos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999" target="_blank" className="hover:underline" rel="noreferrer">
                  Fale Conosco - WhatsApp
                </a>
              </li>
              <li>
                <a href="tel:08007771234" className="hover:underline">
                  0800 777 1234
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Termos E Políticas</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trocas e Devoluções
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Segurança</h3>
            <p className="text-sm">Site 100% Seguro</p>
            <p className="text-sm">Certificado SSL</p>
          </div>
        </div>

        <div className="border-t border-red-400 pt-8 mt-8">
          <h3 className="font-bold text-lg mb-4 text-center">Formas de Pagamento</h3>
          <div className="text-center space-y-2">
            <p>💳 Cartões: Visa, Mastercard, Elo, Diners, JCB, Hipercard</p>
            <p>💰 PIX • 🎫 Boleto Bancário</p>
            <p>📱 Parcelamento em até 12x sem juros</p>
          </div>
        </div>
      </div>

      <div className="bg-white text-black py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            NORDESTE PARTICIPACOES S.A - CNPJ: 10.331.096/0001-24
            <br />
            Rua Alexandre Dumas, 1711 - 5º andar - Chácara Santo Antônio, São Paulo, CEP: 04717-004
          </p>
        </div>
      </div>
    </footer>
  )
}
